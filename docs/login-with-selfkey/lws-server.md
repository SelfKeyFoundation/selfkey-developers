---
id: lws-server
title: Server Implementation
sidebar_label: Server Implementation
---

## Server Library Overview
* Dynamic resolution of server domain and routes
* Dynamic config of requested info
* Session management for:
	* New User (create account w/ LWS info)
	* Existing User w/o LWS (add LWS to email user)
	* Existing User w/ LWS (add wallet)

## Implementing the LWS API

Your web service must expose the following API endpoints relative to the path defined in the client config object to be compatible with Login with SelfKey.

You may mount the Login with SelfKey API at any path in your application's router, however the relative route structure defined in this document must be maintained.

For example, if you choose to mount the LWS API at https://example.com/api/v1/auth/selfkey you **must** implement each route as follows:

```
GET  /api/v1/auth/selfkey
POST /api/v1/auth/selfkey
POST /api/v1/auth/selfkey/login (optional)
```

### Nonce Endpoint (`GET /`)

The SelfKey Identity Wallet will make a `GET` request to this endpoint to retrieve a nonce for signing with the user's Ethereum private key. Your implementation must generate the nonce string in a cryptographically-secure fashion and store it in your application's session store in order to validate the signature produced by the SelfKey ID Wallet.  You can use the selfkey.js library or the SVS API to create the nonce if you prefer to not introduce additional dependencies.

#### Response

- `nonce` is a string generated in a cryptographically secure fashion.

**Example:**

```json
{ "nonce": "u9YGjSOQ4g620ACyYdbyv978gbujhff6fygni9" }
```

### Authentication Endpoint (`POST /`)

The SelfKey Identity Wallet will make a `POST` request to this endpoint containing the ethereum address, nonce, signature and the requested identity attributes, if any.

#### Request
- `publicKey` is the ethereum wallet address that the user unlocked to create the signature with the associated private key
- `nonce` is the nonce used to create the signture along with the private key
- `signature` is the ECDSA signature obtained by signing the nonce string with the user's Ethereum private key - base64 encoded string
- `attributes` is an array of the requested identity attributes as defined in the client library configuration.  Attributes can consist of string data or documents sent as a base64 encoded data uri string.  

**Example:**

```json
{
  "publicKey": "2b6a21dc440cebd4bb9b91b27014ace8aa91a0b9",
  "nonce": "19B0KTk1b3OikJjy6Yjn3y5DfPgxVAT7RQa72d9nXrOO89bIkwMBIcBuSKbWlXAW",
  "signature": "eyJyIjoiZGRlNjgwYTJkMDhjNTQ4ZWVkNjYwYzA0YWVmODdmYWU4MzM1ZDU0ZTk5YzljZjYxYzY5YWNkZmU3YzQyNWVjNCIsInMiOiIxNzE5NDU3NmE0M2NjYjE3MTE4NTVjMjljMGU0MzAyMTYzMmZkMjY2ZDAzNjhiMzZlODAwN2Q0OTdjZDE3ZjU1IiwidiI6Mjh9",
  "attributes": [
    {
      "key": "first_name",
      "label": "First Name",
      "document": false,
      "data": {
        "value": "John"
      }
    },
    {
      "key": "last_name",
      "label": "Last Name",
      "document": false,
      "data": {
        "value": "Smith"
      }
    },
    {
      "key": "email",
      "label": "Email",
      "document": false,
      "data": {
        "value": "john.smith@example.com"
      }
    },
    {
      "key": "passport",
      "label": "Passport",
      "document": true,
      "data": {
        "value": "YTJkMDhjNTQ4ZWVkNjYwYzA0YWVmODdmYWU4MzM1ZDU0ZTk5YzljZjYxYzY5YWNkZmU3YzQyNWVjNCIsInMiOiIxNzE5NDU3NmE0M2NjYjE3MTE4NTVjMjljMGU0MzAyMTYzMjYwYzA0YWVmODdmYWU4MzM1ZDkMDhjNTQ4ZWVkNjYwYzA0YWVmOD"
      }
    }
  ]
}
```

#### Response

- `token` is either a single-use, expiring authentication token returned to the browser that can be used to esablish a cookie-based session **or** a long-lived authentication token (such as a JWT) for your service.

**Example:**

```json
{
  "token": "CnQbKQq2lHI3qVIs3udE4G7ENVudhEzklNOQ4TG08jgKjwE29aCh6kCZLgU8dsn4"
}
```

### Login Endpoint (`POST /login`)

The login endpoint is used to establish a cookie-based session between the user's browser and your web app. **If your web app uses bearer tokens for authentication and you have implemented the `onAuthResponse` handler on the client side you do not need to implement this endpoint.**

The browser will make a POST request to this endpoint containing the token returned by the response endpoint. This is required to esablish a cookie-based user session for the browser, since the ID Wallet and browser do not share a cookie store.

#### Request

- `token` is the single-use, expiring authentication token returned by the Response Endpoint.

**Example:**

```json
{
  "token": "CnQbKQq2lHI3qVIs3udE4G7ENVudhEzklNOQ4TG08jgKjwE29aCh6kCZLgU8dsn4"
}
```

#### Response

- `redirectTo` is a valid URL (fully-qualified **or** relative) that the browser will navigate to upon receiving the response.

**Example:**

```json
{
  "redirectTo": "/dashboard"
}
```
