---
id: api-list
title: SelfKey API Endpoints
sidebar_label: All Endpoints
---

#### 1. [GET /auth/challenge](#1-get-auth-challenge)
#### 2. [POST /auth/challenge](#2-post-auth-challenge)
#### 3. [POST /users](#3-post-users)
#### 4. [GET /auth/token](#4-get-auth-token)
#### 5. [POST /login](#5-post-login)
#### 6. [GET /templates/](#6-get-templates)
#### 7. [GET /templates/{templateId}/schema.json](#7-get-templates-templateid-schemajson)
#### 8. [POST /files](#8-post-files)
#### 9. [POST /applications](#9-post-applications)

<hr>

## 1. `GET /auth/challenge`

### Description

This is the first endpoint to be called in all integration configurations.  It will return a Challenge JSON Web Token (C-JWT) which is comprised of the following: 

* `sub:` (Subject) The public IP address from which the challenge request originated
* `nbf:` (Not Before) The epoch timestamp that the JWT was issued at
* `exp:` (Expiration) The epoch timestamp at which the JWT expires
* `nonce:` (Number used Once) A random string of bytes (base64-encoded) which must be signed in order to authenticate

The C-JWT will use the nonce to help create the signature required for the authentication process.  

### Response

Status 200: `jwt` C-JWT (Challenge Token)

```json

{ 
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4" 
}

```

<hr>

## 2. `POST /auth/challenge`

### Description

In order to authenticate we will send a signature with the C-JWT in the header to this endpoint.  It will return a Wallet JSON Web Token (W-JWT) which is comprised of the following:

* `sub:` (Subject) The wallet’s public key
* `nbf:` (Not Before) The epoch timestamp that the JWT was issued at
* `exp:` (Expiration) The epoch timestamp at which the JWT expires

The website origin may be required in the header depending on the integration configuration. 

### Headers
```javascript
Authorization: Bearer <C-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

### Body
```javascript
{ 
  "signature": <signature> 
} 
```

### Response

Status 200: `jwt` W-JWT (Wallet Token)

**Example:**

```json

{ 
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4" 
}

```

### Errors

- 400
- 401

<hr>

## 3. `POST /users`

### Description

This endpoint can be used to simultaneously create a new user and submit identity related data and documents for KYC processing.  A W-JWT is required in the header and the body request format for data should follow the example below.  A successful request will return a User Token and allow for an authenticated session in the browser to begin.

### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
Content-Type: multipart/form-data; boundary=Boundary
```

### Body
```javascript

--Boundary
Content-Type: application/json
Content-Disposition: form-data; name="attributes"
"[{
  "id":"http://attribute-url/1",
  "data":{
    "value":{
      "image":"$document-1"
      }
    }
  },
  {
    "id":"http://attribute-url/2",
    "data":{
      "value":{
        "image":"$document-2"
      }
    }
}]"
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

### Response

Status 201: JSON `message` and User `token`

```json

{ 
  "message": "User Created Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4"
}

```

### Errors

- 400
- 401

<hr>

## 4. `GET /auth/token`

### Description

Returns a user token.  Requires a valid W-JWT in the header to return successfully.

### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

### Response

Status 200: User `token`

```json

{ 
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4" 
}

```

### Errors

- 400
- 404

<hr>

## 5. `POST /login`

### Description

Dedicated endpoint for login purposes.  Returns a redirect URL that will create an authenticated session in the browser.  

### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

### Body
```javascript
{ 
  "token": <token> 
} 
```

### Response

Status: 200 `redirectUrl`

```json

200

{ 
  "redirectUrl": "https://example.com/success" 
}

```

### Errors

- 400
- 401
- 404

<hr>

## 6. `GET /templates`

<div class="notebox">KYC-Chain API Endpoint</div>

### Description

Returns an array of KYC Templates.

### Response

Status 200: Array of `templates`

```json

{ 
  "templates": [ 
    {
      "id": 1
    },
    {
      "id": 2
    }
  ] 
}

```

<hr>

## 7. `GET /templates/{templateId}/schema.json`

<div class="notebox">KYC-Chain API Endpoint</div>

### Description

Returns a single KYC Template.

### Response

Status 200: Single `template`

```json

{
  "template": { 
    "id": 1
  }
}

```

### Errors

- 404

<hr>

## 8. `POST /files`

<div class="notebox">KYC-Chain API Endpoint</div>

### Description

Submit files 

### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

### Body
```javascript
{ 
  "file": <file> 
} 
```

### Response

Status 200: `fileId`

```json

{ 
  "fileId": "1234" 
}

```

### Errors

- 400
- 401

<hr>

## 9. `POST /applications`

<div class="notebox">KYC-Chain API Endpoint</div>

### Description

Submit a KYC application process 

### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

### Body
```javascript
{ 
  "templateId": <template_id>,
  "attributes": <attributes>,
  "files": <files>
} 
```

### Response

Status 201: JSON `message`

```json

{ 
  "message": "Application Created" 
}

```

### Errors

- 400
- 401

<hr>


