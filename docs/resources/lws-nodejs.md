---
id: lws-nodejs
title: NodeJS Server SDK
---
<img src='/img/node.png' width='240px'>

## Overview
The NodeJS Server SDK for Login with SelfKey

## Implementation
To integrate Login with SelfKey on your frontend, please read:
* [Client Implementation](https://selfkeyfoundation.github.io/docs/login-with-selfkey/lws-client.html)
* [Client Library](https://selfkeyfoundation.github.io/docs/resources/lws-js.html)

For more details about integrationg Login with SelfKey on your backend, please read:
* [Server Implementation](https://selfkeyfoundation.github.io/docs/login-with-selfkey/lws-server.html)

## Resources

### Node Packages (NPM)
SelfKey currently provides 2 NPM libraries for use with Login with SelfKey along with some custom configuration to integrate. 

#### selfkey.js
selfkey.js is a library with functions used for generating and verifying the cryptographic signatures used by the Login with SelfKey authentication process as well as additional helpers. 

`npm install selfkey.js`
* <img src='/img/npm.png' width='40px'> [&nbsp;&nbsp;https://www.npmjs.com/package/selfkey.js](https://www.npmjs.com/package/selfkey.js)
* <img src='/img/github.png' width='40px'>[&nbsp;&nbsp;https://github.com/SelfKeyFoundation/selfkey.js](https://github.com/SelfKeyFoundation/selfkey.js)

#### passport-selfkey
passport-selfkey is a passportjs Strategy library to integrate Login with SelfKey authentication process with passportjs. 

`npm install passport-selfkey`
* <img src='/img/npm.png' width='40px'>[&nbsp;&nbsp;https://www.npmjs.com/package/passport-selfkey](https://www.npmjs.com/package/passport-selfkey)
* <img src='/img/github.png' width='40px'> [&nbsp;&nbsp;https://github.com/SelfKeyFoundation/passport-selfkey](https://github.com/SelfKeyFoundation/passport-selfkey)


### Demo Site
An example implementation of Login with SelfKey in NodeJS can be found in the demo site repository.  It can be used to help integrate Login with SelfKey with your NodeJS API.  

https://github.com/SelfKeyFoundation/selfkey-nodejs-demo

The SelfKey NodeJS Demo (_B*Trade_) is a mock web application that is used for integration testing for the Login w/ SelfKey (LWS) system and the SelfKey Marketplace.  It's built on NodeJS and Express, serves static renders of pages and manages authentication and session using the PassportJS library.  

LWS currently provides some NPM packages along with some custom configuration to integrate.  There is passport-selfkey which is a Strategy library to integrate LWS with the auth and session management provided by the Passport library.  There is selfkey.js which is a collection of functions related to generating and verifying the cryptographic signatures used by LWS as well as additional helper functions. 
