---
id: svs
title: Signature Verification Service
---

## Signature Verification Service

https://github.com/SelfKeyFoundation/selfkey-svs

### Install

Clone, install and run - requires NodeJS

`git clone git@github.com:SelfKeyFoundation/selfkey-svs.git`

`cd selfkey-svs`

`npm install`

`npm run dev`

### Usage

Send a `POST` request to the service endpoint '/' with a nonce, signature and ethereum address in the body using the following fields:

```
nonce: <nonce value>
signature: <signature value>
publicKey: <ethereum address>
```

To create the data you can use the functions in the `selfkey.js` library - also see the test file for an example of this.

### Docker

Build the container and run it - forward the port as you see fit

`docker build .`

`docker run -p 3018:3018 <container id>`
