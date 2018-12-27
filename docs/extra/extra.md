### Authentication Endpoint (`POST /`)

The SelfKey Identity Wallet will make a `POST` request to this endpoint containing the ethereum address, nonce, signature and the requested identity attributes, if any.  You can use the selfkey-lib npm module or the selfkey-service Docker container to verify the signature.

#### Request
- `publicKey` is the ethereum wallet address that the user unlocked to create the signature with the associated private key
- `nonce` is the nonce used to create the signture along with the private key
- `signature` is the ECDSA signature obtained by signing the nonce string with the user's Ethereum private key - base64 encoded string
- `attributes` is an array of the requested identity attributes as defined in the client library configuration.  Attributes can consist of string data or documents sent as a base64 encoded data uri string.  

**Example:**

```javascript
GET /challenge

Headers: 
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or ‘IDW’
No payload

Response Example:
{
  “jwt”: “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4”
}

POST /challenge

Headers: 
Authorization: Bearer C-JWT
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or ‘IDW’
Content-Type: ‘application/json’
Example Payload:
{ “signature”: “...signature…” } 

Response Example:
{
  “jwt”: “eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4”
}


POST /users

Headers: 
Authorization: Bearer W-JWT
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or ‘IDW’
Payload Example:
ContentType: mutlipart/form-data

Content-Type: multipart/form-data; boundary=Boundary

--Boundary
Content-Type: application/json
Content-Disposition: form-data; name="attributes"
"[{"id":"http://attribute-url/1","data":{"value":{"image":"$document-1"}}},{"id":"http://attribute-url/2","data":{"value":{"image":"$document-2"}}}]"
--Boundary

--Boundary
Content-Type: image/jpeg
Content-Disposition: form-data; name="$document-1"
...(binary bytes of the image)...
--Boundary
Content-Type: image/jpeg
Content-Disposition: form-data; name="$document-2"
...(binary bytes of the image)...
--Boundary
```

# .


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

## Get the Source Code
<span style="display: inline;">
[![Github](https://img.shields.io/badge/GitHub-Released-green.svg)](https://github.com/SelfKeyFoundation/Identity-Wallet/)
</span> 

<span style="display: inline;">
[![GitHub tag](https://img.shields.io/github/tag/SelfKeyFoundation/Identity-Wallet.svg)](https://github.com/SelfKeyFoundation/Identity-Wallet/tags/)
</span>

<span style="display: inline;">
[![GitHub stars](https://img.shields.io/github/stars/SelfKeyFoundation/Identity-Wallet.svg?style=social&label=Star&maxAge=2592000)](https://github.com/SelfKeyFoundation/Identity-Wallet/stargazers/)
</span>

<span style="display: inline;">
[![GitHub watchers](https://img.shields.io/github/watchers/SelfKeyFoundation/Identity-Wallet.svg?style=social&label=Watch&maxAge=2592000)](https://github.com/SelfKeyFoundation/Identity-Wallet/watchers/)
</span>

<span style="display: inline;">
[![GitHub contributors](https://img.shields.io/github/contributors/SelfKeyFoundation/Identity-Wallet.svg)](https://github.com/SelfKeyFoundation/Identity-Wallet/graphs/contributors/)
</span>