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

// Define the following route and call the challenge JWT function from the selfkey library

router.get('/selfkey/v2/auth/challenge/:publicKey', async (req, res) => {
  let authResult = await selfkey.challengeJWT(req.params.publicKey)
  return res.status(authResult.status).json(authResult)
})

```

<hr>

## 2. `POST /auth/challenge`

### Example

```javascript

// Split up the challenge JWT elements and call the challenge response function from the selfkey library

router.post('/selfkey/v2/auth/challenge', selfkey.jwtAuthMiddleware, async (req, res) => {
  let challenge = req.decodedAuth.challenge
  let publicKey = req.decodedAuth.sub
  let { signature } = req.body || {}
  let authResult = await selfkey.handleChallengeResponse(challenge, signature, publicKey)
  return res.status(authResult.status).json(authResult)
})

```

<hr>

## 3. `POST /users`

### Example

```javascript

// Call the middleware functions from the selfkey library and add a create user function

router.post('/selfkey/v2/users', selfkey.jwtAuthMiddleware, selfkey.serviceAuthMiddleware, upload.any(), createUser)

const createUser = async (req, res) => {
  let publicKey = req.decodedAuth.sub
  let attributes = req.body.attributes
  
  try {
    attributes = JSON.parse(attributes)
  } catch (error) {
    return res.status(400).json({ code: 'invalid_attributes', message: 'Attributes field must be a json string' })
  }
  if (!attributes || !attributes.length) {
    return res.status(400).json({ code: 'no_attributes', message: 'No attributes provided' })
  }
  
  // Express specific Multer handling
  let documents = req.files.map(f => {
    let id = f.fieldname.match(/^\$document-([0-9]*)$/) || Math.Random(1,3).toString()
    let doc = {
      mimeType: f.mimetype,
      size: f.size,
      content: f.buffer,
      link: path.join(__dirname, '../', '/public/uploads/', publicKey, '/', id),
      id: id
    }
    return doc
  })

  // Add docs to DB
  documents = documents.map(doc => {
    let newDoc = Document.create(doc)
    return doc
  })

  attributes = attributes.map(attr => {
    let attrDocs = attr.documents
      .map(id => {
        let found = documents.filter(doc => doc.id === id)
        return found.length ? found[0] : null
      })
      .filter(doc => !!doc)
    attr = { ...attr, documents: attrDocs }
    let { value } = selfkey.denormalizeDocumentsSchema(attr.schema, attr.data, attrDocs)
    return { id: attr.id, value }
  })

  let user = await User.findOne({selfkey_wallet: publicKey})
  
  let realToken = await generateToken() // integrator specific token used for URL auth
  
  if (user) {
    user = await User.update({selfkey_wallet: publicKey}, { token: realToken, attributes: attributes })
  } else {
    user = await User.create({selfkey_wallet: publicKey, token: realToken, attributes: attributes})
  }
  if (!user) {
    return res.status(400).json({ code: 'could_not_create', message: 'Could not create user' })
  }
  return res.status(201).json({ user: user, token: realToken})
}

```

<hr>

## 4. `GET /auth/token`

### Example
```javascript

// Call the selfkey middleware functions and add handler for user payload

router.get('/selfkey/v2/auth/token', selfkey.jwtAuthMiddleware, selfkey.serviceAuthMiddleware, getUserPayload)

const getUserPayload = async (req, res) => {
  let publicKey = req.decodedAuth.sub
  let user = await User.findOne({selfkey_wallet: publicKey})
  if (!user) {
    return res.status(404).json({ code: 'user_does_not_exist', message: 'User with provided public key does not exist' })
  }
  let userToken = selfkey.userJWT({ subject: '' + user.selfkey_wallet })
  return res.status(200).json({ token: userToken })
}

```

<hr>

## 5. `POST /login`

### Example

```javascript

// Add the following route and a login handler, use the selfkey library to verify the token

router.options('/selfkey/v2/login', cors())

router.post('/selfkey/v2/login', cors(), login)

const login = async (req, res) => {
  const { body } = req
  if (!body.token) {
    return res.status(400).json({ redirectTo: '/login' })
  } 
  try {
    let decoded = selfkey.verifyJWT(body.token)
    let user = await User.findOne({selfkey_wallet: decoded.sub})
    if (!user) {
      return res.status(404).json({ redirectTo: '/login' })
    }
    return res.json({ redirectTo: '/success/' + user.token })
  } catch (error) {
    return res.status(401).json({ redirectTo: `/login` })
  }
}

```

<hr>


