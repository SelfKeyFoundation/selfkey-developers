---
id: lws-ux
title: LWS UX Summary
sidebar_label: User Experience
---

1. A user walks into a bar, opens up their macbook and goes to bennytrade.com, clicks the Login with SelfKey button...
    * They don't have the BE installed yet (IDW installed doesn't matter at this point)
        * Beta Test - They are directed in a new tab to the SelfKey Download centre that has detailed install instructions, links to downloads etc...
        * Product
    * They have the BE installed but they don't have the IDW installed
        * The BE pops up some UI panel and directs them to the download center OR directly provides them links to the IDW download
    * They have everything installed and running then...
2. When they return to the browser tab of bennytrade.com, 
    * the page detects the BE is installed and enabled
    * the BE modifies the DOM using the injection script
    * begins the init process to test connections with the IDW and Server
3. BE is enabled, auto tests connection to both IDW and Server
    * gets the host server URL from the page they are on and concatenate with endpoint
    * if either connection fails show the error screen with instructions what to do next
    * many cases, error messages and steps to handle
4. BE can confirm working connections to the IDW and Server
    * requests the server to init the auth flow
5. Server returns a response object with
    * "requested login information" data 
    * a nonce which has been generated (uses selfkey.js)
    * the nonce is saved in the DB in a user object (See server side user login/signup flow below)
6. BE sends the nonce to the IDW and requests back the available wallets
    * if no wallets prompt the user to create one
7. IDW returns all available wallets 
    * displays the wallet select view asks user to select one
    * reminds them to make sure that wallet is active and unlocked in their wallet
8. BE requests a signature of that wallet using:
    * the server generated nonce
    * the local private key in the IDW
9. IDW creates a signature using the selfkey.js library
    * sends the signature, nonce and pubKey to the BE
10. Server queries the DB for the matching nonce associated with the user object
    * verifies the signature using the selfkey.js library
    * if it’s all good adds the pubKey to the user object
    * creates a session using the passport-selfkey strategy
