---
id: lws-sandbox
title: SelfKey Development Sandbox
sidebar_label: Development Sandbox
---

## Overview
To facilitate development of Login with SelfKey, we’ve created a sandbox environment that includes several demo components:
- A cryptocurrency exchange Web App, Client and API called “B-Trade” for use with both Marketplace and Login with SelfKey development and integration testing
- A KEY Token Deposit API to simulate interactions with the SelfKey Staking Smart Contract
- An API for providing the ID Wallet Marketplace data
- An API to simulate 3rd party KYC provider

## Requirements
Before you can use Login with SelfKey to authenticate with the B-Trade demo, there are 2 components which must be installed and running:
* SelfKey Identity Wallet
* SelfKey Connect Browser Extension

### SelfKey Identity Wallet
The SelfKey Identity Wallet is a fully functioning Ethereum wallet that supports ERC20 tokens and a number of other features. 

[Read more about the SelfKey Identity Wallet](https://selfkeyfoundation.github.io/docs/getting-started/idw-intro.html)

### SelfKey Connect Browser Extension
SelfKey Connect is a web browser extension that allows for communication with the SelfKey Identity Wallet from within the context of the browser.  

In its current implementation, SelfKey Connect is able to provide the following functionality from within the browser:
- View addresses managed by the SelfKey Identity Wallet
- Remotely unlock JSON Keystore files with a password
- View your SelfKey ID data attributes and documents  
- Submit your data and documents to a 3rd party integrators

[Learn more about the SelfKey Connect Browser Extension](https://selfkeyfoundation.github.io/docs/getting-started/skc-intro.html)

## B-Trade
### Overview
Below the surface we've added some basic support for DID formatting and resolving in the form of a DID resolver tool and implementing data structures for Claim and Credentials objects, which are developed following the W3C DID specification.

### Usage
Once you have B-Trade installed and running, the IDW installed and running and the BE source files served and enabled in the web browser, you'll be able to start testing the user flow for LWS. There are error handling messages for cases where either the IDW or BE are not running with instructions on how to proceed. 

### User Experience
Assuming everything is running the experience for the user is fairly simple and straightforward.
* Click "Login with SelfKey"
* Select a Wallet
* Unlock the wallet if needed
* Verify the information being sent
* Submit the information and initiate the authentication process
* Successfully redirected to the dashboard

If everything goes well during this process, the user will be successfully authenticated into the app. If at any point in the process something goes wrong, the authentication process will fail. 

### Features
Behind the scenes there is a lot happening here. The IDW creates a signature from the wallet private key and a claims object which contains the claim data including the requested attributes and the wallet address being used to authenticate. The IDW then checks that the wallet is unlocked and then creates a signature from the claim object and private key. That signature is added to the "proof" object which is sent to the B-Trade server inside a credentials object. 

### Dependencies
Now the selfkey-passport library is configured to manage a few different cases including if a user account already exists (in which case the wallet address is linked to that user object) as well as creating new account and simply logging into an existing account. 

The selfkey.js library is integrated into the process and provides the means to verify the credentials object that includes the DID and signature.

[View the NodeJS Server SDK](https://selfkeyfoundation.github.io/docs/resources/lws-nodejs.html)
