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

### Required SelfKey API Endpoints for LWS Integration

#### 1. [GET /auth/challenge](#1-get-auth-challenge)
#### 2. [POST /auth/challenge](#2-post-auth-challenge)
#### 3. [POST /users](#3-post-users)
#### 4. [GET /auth/token](#4-get-auth-token)
#### 5. [POST /login](#5-post-login)

<hr>

## 1. `GET /auth/challenge`

### Example

```javascript

router.get('/api/v1/selfkey/auth/challenge', async (req, res) => {
  let token = await generateToken()
  res.status(200).json({jwt: token})
})

```

<hr>

## 2. `POST /auth/challenge`

### Example

```javascript

router.post('/api/v1/selfkey/auth/challenge', async (req, res) => {
  let signature = req.body.signature
  let valid = await verifySignature(signature)
  let token = await generateToken()
  (valid) 
    ? res.status(201).json({jwt: token}) 
    : res.status(400).json({message: 'Invalid Signature'})
})

```

<hr>

## 3. `POST /users`

### Example

```javascript

router.post('/api/v1/selfkey/auth/challenge', async (req, res) => {
  let signature = req.body.signature
  let valid = verifySignature(signature)
  let token = await generateToken()
  if (valid) { 
    res.status(201).json({jwt: token}) 
  } else { 
    res.status(400).json({message: 'Invalid Signature'}) 
  }
})

```

<hr>

## 4. `GET /auth/token`

### Example
```javascript

router.get('/api/v1/selfkey/auth/token', async (req, res) => {
  let token = await generateToken()
  res.status(200).json({user: token})
})

```

<hr>

## 5. `POST /login`

### Example

```javascript

router.post('/api/v1/selfkey/login', async (req, res) => {
  res.status(201).json({redirectUrl: '/success'})
})

```

<hr>


