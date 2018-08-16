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

The SelfKey Identity Wallet will make a `GET` request to this endpoint to retrieve a nonce for signing with the user's Ethereum private key. Your implementation must generate the nonce string in a cryptographically-secure fashion and store it in your application's session store in order to validate the signature produced by the SelfKey ID Wallet.

#### Response

- `nonce` is a string generated in a cryptographically secure fashion.

**Example:**

```json
{ "nonce": "u9YGjSOQ4g620ACyYdby" }
```

### Authentication Endpoint (`POST /`)

The SelfKey Identity Wallet will make a `POST` request to this endpoint containing the signed nonce and the requested identity attributes, if any.

#### Request

- `signature` is the ECDSA signature obtained by signing the nonce string with the user's Ethereum private key, and
- `attributes` are the requested identity attributes as defined in the client library config.

**Example:**

```json
{
  "signature": "0x9955af11969a2d2a7f860c...",
  "attributes": {
    "firstname": "John",
    "lastname": "Smith"
  }
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