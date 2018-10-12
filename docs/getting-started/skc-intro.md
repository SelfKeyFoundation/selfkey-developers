---
id: skc-intro
title: SelfKey Connect
sidebar_label: SelfKey Connect (Browser Ext.)
---

## SelfKey Connect Browser Extension
To create both a convenient user interface and a communications link between the IDW and the LWS server integration, we have developed SelfKey Connect - a Web Browser Extension that provides the user with a way to interact with the other related components directly from the browser window.  In its current implementation it can select available wallet addresses and unlock them remotely using password / keystore file and then choose the wallet for authentication using LWS simultaneously directing the IDW to pass over the data and documents requested by the server integration if needed.  

## Features
* View Wallets Available -> request to IDW, takes response array and displays in UI
* View Wallets Status -> returned in IDW response, adds different icon and CSS class in 
* Select a Wallet for Authentication
* Unlock a Wallet w/ Password
* Displays requested information from server
* Submits authentication credentials and requested info to server
* Handles various error cases
* Redirects to success page in browser

## Development

The SelfKey Connect Browser Extension is a React application that communicates via port messaging to the extension content.js and background.js scripts.  The content.js script communicates with the LWS Client Library while the background.js script communicates with the SelfKey Identity Wallet via a secure Websocket connection.


