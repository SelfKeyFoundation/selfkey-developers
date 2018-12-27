---
id: api-list
title: SelfKey API Endpoints
sidebar_label: All Endpoints
---

## Full list of available integrations endpoints

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

### 1. `GET /auth/challenge`

#### Response

- `jwt` C-JWT (Challenge Token)

```json

200

{ 
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4" 
}

```

<hr>

### 2. `POST /auth/challenge`

#### Headers
```javascript
Authorization: Bearer <C-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

#### Body
```javascript
{ 
  "signature": <signature> 
} 
```

#### Response

- `jwt` W-JWT (Wallet Token)

**Example:**

```json

200

{ 
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4" 
}

```

#### Errors

- 400
- 401

<hr>

### 3. `POST /users`

#### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
Content-Type: multipart/form-data; boundary=Boundary
```

#### Body
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

#### Response

```json

201

{ 
  "message": "User Created Successfully" 
}

```

#### Errors

- 400
- 401

<hr>

### 4. `GET /auth/token`

#### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

#### Response

- `token` User Token

```json

200

{ 
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDIuMjEuMzEuNTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTUxNjQzOTAyMiwiY2hhbGxlbmdlIjoiMDJiODRjOWIyNzYyZWYzNjVhMzgxNGRlODZmZTFkMzhlNThhOTYzNWM0ZGUwYzI0ZTQ3YjlhYWNkYjI2OTZiOCJ9.ogbU0vpulk0AGRaN51fnaB04hhtVMYy_LA8u-qM0Yh4" 
}

```

#### Errors

- 400
- 404

<hr>

### 5. `POST /login`

#### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

#### Body
```javascript
{ 
  "token": <token> 
} 
```

#### Response

```json

200

{ 
  "redirectUrl": "https://example.com/success" 
}

```

#### Errors

- 400
- 401
- 404

<hr>

### 6. `GET /templates`

#### Response

- `templates` Array of templates

```json

200

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

### 7. `GET /templates/{templateId}/schema.json`

#### Response

- `template` Single template

```json

200

{
  "template": { 
    "id": 1
  }
}

```

#### Errors

- 404

<hr>

### 8. `POST /files`

#### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

#### Body
```javascript
{ 
  "file": <file> 
} 
```

#### Response

```json

200

{ 
  "fileId": "1234" 
}

```

#### Errors

- 400
- 401

<hr>

### 9. `POST /applications`

<div class="notebox">KYC-Chain API Endpoint</div>

#### Headers
```javascript
Authorization: Bearer <W-JWT>
User-Agent: SelfkeyIDW/${wallet-version}
Origin: WEBPAGE URL or 'IDW'
```

#### Body
```javascript
{ 
  "templateId": <template_id>,
  "attributes": <attributes>,
  "files": <files>
} 
```

#### Response

```json

201

{ 
  "message": "Application Created" 
}

```

#### Errors

- 400
- 401

<hr>


