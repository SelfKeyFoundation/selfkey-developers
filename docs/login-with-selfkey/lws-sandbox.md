---
id: lws-sandbox
title: Development Sandbox
sidebar_label: Development Sandbox
---

## LWS Integration Sandbox Environment (BennyTrade)
To facilitate development of Login with SelfKey, we’ve created a sandbox environment that emulates a crypto exchange webapp called “BennyTrade”.  

In order to allow users to use LWS to authenticate into BennyTrade, there are 2 components which must be installed and running on the users system:
SelfKey Identity Wallet
SelfKey Browser Extension

The SelfKey Identity Wallet (IDW) is a fully functioning Ethereum wallet that supports ERC20 tokens and a number of other features. For integration with LWS we've added the ability to communicate and pass data from the IDW to the SelfKey Browser Extension (BE)
In its current implementation, the BE is able to get the list of available Ether wallets managed by the wallet, remotely unlock the keystore file directly via the BE and finally it can pull the ID attributes of a selected wallet and pass along that information to the exchange.

Below the surface we've added some basic support for DID formatting and resolving in the form of a DID resolver tool and implementing data structures for Claim and Credentials objects, which are developed following the W3C DID specification.
Usage
Once you have Bennytrade installed and running, the IDW installed and running and the BE source files served and enabled in the web browser, you'll be able to start testing the user flow for LWS. There are error handling messages for cases where either the IDW or BE are not running with instructions on how to proceed. 

Assuming everything is running the experience for the user is fairly simple and straightforward.
Click "Login with SelfKey"
Select a Wallet
Unlock the wallet if needed
Verify the information being sent t
Submit the information and initiate the authentication process
Successfully redirected to the dashboard

Behind the scenes there is a lot happening here. The IDW creates a signature from the wallet private key and a claims object which contains the claim data including the requested attributes and the wallet address being used to authenticate. The IDW then checks that the wallet is unlocked and then creates a signature from the claim object and private key. That signature is added to the "proof" object which is sent to the Bennytrade server inside a credentials object. 

Now the selfkey-passport library is configured to manage a few different cases including if a user account already exists (in which case the wallet address is linked to that user object) as well as creating new account and simply logging into an existing account. 

The selfkey.js library is integrated into the process and provides the means to verify the credentials object that includes the DID and signature.

If everything goes well during this process, the user will be successfully authenticated into the app. If at any point in the process something goes wrong, the authentication process will fail. 

Security is paramount in this process and we are performing continuous security auditing and review throughout the development and release cycles.
