---
id: lws-api
title: Login with SelfKey API Documentation
sidebar_label: API Documentation
---

## Summary of Components
### Client Implementation
The client implementation component is the part of the authentication system that is displayed in the browser from the integrators website.  This includes the code snippets for the button, modal and iFrame as well as the config object. 

### SelfKey Connect Browser Extension
The SelfKey Connect API is a combination of 3 components:
* Content Script
* lws.js (Main Script)
* Background Script

These 3 components work together to communicate both internally and externally.   The content script used to interact with the browser DOM, lws.js manages user interaction and the UI state displayed in the iFrame while the background script is used to communicate with the SelfKey Identity Wallet.  To communicate internally within the Browser Extension, Chrome Messaging protocol is used and JSON objects with required data are passed between components.

### SelfKey Identity Wallet
The SelfKey Identity Wallet communicates with the SelfKey Connect Browser Extension via a Websockets connection and communicates with the Server Implementation via HTTP requests.

### Server Implementation
The Server Implementation communicates with the SelfKey Identity Wallet by providing a JSON REST API for HTTP requests.

## Message Body Examples
### Chrome Messaging and Websockets Messages
Messages are passed internally using Chrome Messaging between the SelfKey Connect Browser Extension components as well as the messages sent between the Background script and the SelfKey Identity Wallet Websocket Server.  Message format is following Flux Standard Action.

* <img src='/img/github.png' width='30px'>&nbsp;&nbsp;[Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)

#### Examples
```json
// No Payload
{
    "type": "wallets",
    "meta": {
        "id": "lws_bg-8",
        "src": "lws_bg"
    }
}

// With Payload
{
    "type": "wallets",
    "meta": {
        "id": "lws_bg-8",
        "src": "idw"
    },
    "payload": [
        {
            "address": "0x1234abcd",
            "unlocked": false
        },
        {
            "address": "0x5678efgh",
            "unlocked": true
        }
    ]
}

// Error Message
{
    "type": "wallets",
    "meta": {
        "id": "idw-8",
        "src": "idw"
    },
    "error": "No wallets found"
}
```

### HTTP
Sent from the SelfKey Identity Wallet either a GET request possibly with query string or a POST request with multipart form data

#### Example
**Request**
```json
{
	"wallet": "0x1234abcd",
	"nonce": "54321edcba09876",
	"signature": "eyJyIjoiZGRlNjgwYTJkMDhjNTQ4ZWVkNjYwYzA0YWVmODdmYWU4MzM1ZDU0ZTk5YzljZjYxYzY5YWNkZmU3YzQyNWVjNCIsInMiOiIxNzE5NDU3NmE0M2NjYjE3MTE4NTVjMjljMGU0MzAyMTYzMmZkMjY2ZDAzNjhiMzZlODAwN2Q0OTdjZDE3ZjU1IiwidiI6Mjh9"
}
```
**Response**
```json
{
	"redirectUrl": "/success.html"
}
```


## 1: Preflight Connect Checks
This part of the system is running before in the background before any user interaction takes place.  The purpose is to verify successful connections between the Integrating Client Implementation, SelfKey Connect Browser Extension, SelfKey Identity Wallet and the Integrating LWS API Implementation.  

If all connections are working then when the user clicks the Login with SelfKey button in the browser, the authentication process with begin successfully, otherwise an error message with instructions will be displayed to the user explaining which component is not working and instructions on how to download and run the missing component (Browser Extension or Wallet App) This will also handle any errors from the 3rd party implementation having connection issues, for example if the API Implementation is down.

### 1.a LWS_INIT
* **Source:** Client Implementation
* **Target:** SK Connect Content Script
* **Endpoint:** `/LWS_INIT`
* **Protocol:** Chrome Messaging
* **Description:** Initial test connection between the client implementation in the browser DOM and the SelfKey Connect Browser extension via the injected content script.  If the client cannot connect with the browser extension, and error message will be returned which will indicate to the client implementation to display user instructions regarding the installing and running the required components. (SelfKey Connect Browser Extension and SelfKey Identity Wallet)

**Example**
```json
{
    "type": "init",
    "meta": {
        "id": "lws_client-1",
        "src": "lws_client"
    },
    "payload": { 
        "path": "/api/v1/auth/selfkey",
        "el": ".lwsConfig",
        "attributes": [ 
            {     
                "key": "first_name", 
                "label": "First Name", 
                "attribute": "http://platform.selfkey.org/schema/attribute/first-name.json" 
            }, { 
                "key": "last_name", 
                "label": "Last Name", 
                "attribute": "http://platform.selfkey.org/schema/attribute/last-name.json" 
            } 
        ] 
    }
}
```

### 1.b CONNECT
* **Source:** SK Connect Content Script
* **Target:** SK Connect Background Script
* **Endpoint:** `/CONNECT`
* **Protocol:** Chrome Messaging
* **Description:** Passes the init message internally within the SelfKey Connect Browser Extension from the content script to the background script in preparation for testing the connection with the SelfKey Identity Wallet.

**Request Example**
```json
{
    "type": "init",
    "meta": {
        "id": "lws_client-1",
        "src": "lws_cs"
    },
    "payload": { 
        "path": "/api/v1/auth/selfkey",
        "el": ".lwsConfig",
        "attributes": [ 
            {     
                "key": "first_name", 
                "label": "First Name", 
                "attribute": "http://platform.selfkey.org/schema/attribute/first-name.json" 
            }, { 
                "key": "last_name", 
                "label": "Last Name", 
                "attribute": "http://platform.selfkey.org/schema/attribute/last-name.json" 
            } 
        ] 
    }
}
```

### 1.c CONNECT
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:** `/CONNECT`
* **Protocol:** Websocket Connection
* **Description:** Tests the connection between the SelfKey Connect Browser Extension and the SelfKey Identity Wallet via a secure WebSocket Connection.  If the connection fails an error message will be returned that will allow the Browser Extension UI to dispal instructions regarding how to install and run the SelfKey Identity Wallet.

**Request Example**
```json
{
    "type": "init",
    "meta": {
        "id": "lws_client-1",
        "src": "lws_bg"
    },
    "payload": { 
        "path": "/api/v1/auth/selfkey",
        "el": ".lwsConfig",
        "attributes": [ 
            {     
                "key": "first_name", 
                "label": "First Name", 
                "attribute": "http://platform.selfkey.org/schema/attribute/first-name.json" 
            }, { 
                "key": "last_name", 
                "label": "Last Name", 
                "attribute": "http://platform.selfkey.org/schema/attribute/last-name.json" 
            } 
        ] 
    }
}
```

### 1.d CONNECT
* **Source:** SK Identity Wallet
* **Target:** Server Implementation
* **Endpoint:** `/CONNECT`
* **Protocol:** HTTP Request
* **Description:** Tests the connection between the SelfKey Identity Wallet and the Server Implementation via HTTP request.  If the connection fails an error will be returned to disable any attempt to begin the authentication process as it cannot work without access to a server implementation.

**Request Example**
```json
{
	"request": "init"
}
```
**Response: Success**
```json
{
	"response": "init",
	"message": "Successfully connected to LWS API Implementation"
}
```
**Response: Error**
```json
{
	"error": "Error connecting to Integration Server"
}
```

## 2: Client Authentication Request
After the preflight checks are successful and all components are installed, running and communicating successfully, the actual authentication flow can begin. 

### 2.a AUTH_REQUEST
* **Source:** Client Implementation
* **Target:** SK Connect Content Script
* **Endpoint:** `/AUTH_REQUEST`
* **Protocol:** Chrome Messaging
* **Description:** Begins the actual authentication process for Login with SelfKey by sending a message to the SelfKey Connect Browser Extension.  If the complete authentication process is successful, a redirect link will be returned and the users browser tab will be updated to reflect the redirect url.  The redirect URL is fully customizable from within the server implementation.  

**Request Example**
```json
{
	"request": "auth"
}
```
**Response: Success**
```json
{
	"response": "auth",
	"message": "Authentication Successful",
	"redirectUrl": "/success.html"
}
```
**Response: Error**
```json
{
	"response": "auth",
	"error": "Authentication Failed"
}
```

## 3: Available Wallets

### 3.a WALLETS_REQUEST
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:** `/WALLETS_REQUEST`
* **Protocol:** Chrome Messaging
* **Description:** A message sent from the SK Connect iFrame to the Background Script which will be forwarded as a request to get information about available wallets associated with the users SelfKey Identity Wallet.  A successful request will return an array of available wallets.

**Request Example**
```json
{
	"type": "wallets",
    "meta": {
        "id": "lws-3",
        "src": "lws"
	}
}
```

### 3.b WALLETS_REQUEST
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:** `/WALLETS_REQUEST`
* **Protocol:** Websocket Connection
* **Description:** A request for information about available wallets from the SelfKey Connect Browser Extension to the SelfKey Identity Wallet.  The request message is sent via Websocket Connectino and the wallet will return information about available wallets and also if a wallet is currently unlocked already.

**Request Example**
```json
{
	"type": "wallets",
    "meta": {
        "id": "lws-3",
        "src": "lws_bg"
	}
}
```
**Response: Success**
```json
{
	"response": "wallets",
	"wallets": [
		{
			"id": "1",
			"address": "0x1234abcd..."
		},
		{
			"id": "2",
			"address": "0x5678efgh..."
		}
	]
}
```
**Response: Error**
```json
{
	"response": "wallets",
	"error": "No Wallets Found"
}
```


## 4: JSON Keystore Unlock

### 4.a UNLOCK
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:** `/UNLOCK`
* **Protocol:** Chrome Messaging
* **Description:** Submits wallet address and password data from the SK Connect iFrame to the Background Script to be passed on to the SelfKey Identity Wallet.  

**Request Example**
```json
{
	"request": "unlock",
	"address": "0xabcd1234",
	"password": "pass1234"
}
```
**Response: Success**
```json
{
	"response": "unlock",
	"address": "0xabcd1234",
	"message": "Wallet Unlocked Successfully"
}
```
**Response: Error**
```json
{
	"response": "unlock",
	"error": "Invalid Credentials"
}
```

### 4.b UNLOCK
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:** `/UNLOCK`
* **Protocol:** Websockets Connection
* **Description:** Submits wallet address and password data from the SK Connect Background Script to the SelfKey Identity Wallet to unlock a specified wallet.  If the correct crendentials are passed on, the wallet will be unlocked and the private key will be available to create the signature required for authentication. 

**Request Example**
```json
{
	"request": "unlock",
	"address": "0xabcd1234",
	"password": "pass1234"
}
```
**Response: Success**
```json
{
	"response": "unlock",
	"message": "Wallet Unlocked Successfully"
}
```
**Response: Error**
```json
{
	"response": "unlock",
	"error": "Invalid Credentials"
}
```


## 5: Request Attributes and Documents

### 5.a ATTR_REQ
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:** `/ATTR_REQ`
* **Protocol:** Chrome Messaging
* **Description:** Submits an internal request from the SelfKey Connect iFrame to the Background Script for id attribute data and documents.  The request will be passed on to the SelfKey Identity Wallet and if successful will return information data points. 

**Request Example**
```json
{
	"request": "attributes",
	"required": [
		{
			"name": "First Name",
			"key": "first_name",
			"attribute": "http://platform.selfkey.org/schema/attribute/first-name.json"
		},
		{
			"name": "Last Name",
			"key": "last_name",
			"attribute": "http://platform.selfkey.org/schema/attribute/last-name.json"
		},
		{
			"name": "Email Address",
			"key": "email_address",
			"attribute": "http://platform.selfkey.org/schema/attribute/email.json"
		},
		{
			"name": "Phone",
			"key": "phone_number",
			"attribute": "http://platform.selfkey.org/schema/attribute/phone-number.json"
		}
	]
}
```
**Response: Success**
```json
{
	"response": "attributes",
	"attributes": [
		{
			"key": "first_name",
			"value": "Bobby"
		},
		{
			"key": "last_name",
			"value": "Lee"
		},
		{
			"key": "email_address",
			"value": "bobby@bitcoin.com"
		},
		{
			"key": "phone_number",
			"value": "18001234567"
		}
	]
}
```
**Response: Error**
```json
{
	"response": "attributes",
	"error": "Attrbute Missing"
}
```

### 5.b ATTR_REQ
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:** `/ATTR_REQ`
* **Protocol:** Websockets Connection
* **Description:** Sends a request from the SK Connect Browser Extension to the SelfKey Identity Wallet for identity data and document information.  A successful request will return an array of attribute details to be displayed in the UI to confirm submission of data before the server authentication process.  

**Request Example**
```json
{
	"request": "attributes",
	"required": [
		{
			"name": "First Name",
			"key": "first_name",
			"attribute": "http://platform.selfkey.org/schema/attribute/first-name.json"
		},
		{
			"name": "Last Name",
			"key": "last_name",
			"attribute": "http://platform.selfkey.org/schema/attribute/last-name.json"
		},
		{
			"name": "Email Address",
			"key": "email_address",
			"attribute": "http://platform.selfkey.org/schema/attribute/email.json"
		},
		{
			"name": "Phone",
			"key": "phone_number",
			"attribute": "http://platform.selfkey.org/schema/attribute/phone-number.json"
		}
	]
}
```
**Response: Success**
```json
{
	"response": "attributes",
	"attributes": [
		{
			"key": "first_name",
			"value": "Bobby"
		},
		{
			"key": "last_name",
			"value": "Lee"
		},
		{
			"key": "email_address",
			"value": "bobby@bitcoin.com"
		},
		{
			"key": "phone_number",
			"value": "18001234567"
		}
	]
}
```
**Response: Error**
```json
{
	"response": "attributes",
	"error": "Attrbute Missing"
}
```

## 6: Server Authentication Request

### 6.a AUTH_REQ
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:** `/AUTH_REQUEST`
* **Protocol:** Chrome Messaging
* **Description:** Submits an internal message from the SK Connect iFrame to the Background Script with the information needed for the request to the SelfKey Identity Wallet.

**Request Example**
```json
{
	"request": "signature",
	"wallet": "0x1234abcd",
	"attributes": [
		"first_name",
		"last_name",
		"email_address",
		"phone_number"
	],
	"documents": [
		"passport"
	]
}
```
**Response: Success**
```json
{
	"response": "signature",
	"message": "Authentication Successful",
	"redirectUrl": "/success.html"
}
```
**Response: Error**
```json
{
	"response": "signature",
	"error": "Authentication Failed"
}
```

### 6.b AUTH_REQ
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:** `/AUTH_REQUEST`
* **Protocol:** Websockets Connection
* **Description:** Submits a request for the creation of a signature and the submission of data and documents from the SK Connect Browser Extension to the SelfKey Identity Wallet.  A successful request will trigger a request to the server for the final step in the authentication process.

**Request Example**
```json
{
	"request": "signature",
	"wallet": "0x1234abcd",
	"attributes": [
		"first_name",
		"last_name",
		"email_address",
		"phone_number"
	],
	"documents": [
		"passport"
	]
}
```
**Response: Success**
```json
{
	"response": "signature",
	"message": "Authentication Successful",
	"redirectUrl": "/success.html"
}
```
**Response: Error**
```json
{
	"response": "signature",
	"error": "Authentication Failed"
}
```

### 6.c LWS_REQUEST
* **Source:** SK Identity Wallet
* **Target:** Server Implementation
* **Endpoint:** GET `/auth/selfkey/`
* **Protocol:** HTTP Request
* **Description:** Submits an HTTP Request from the SelfKey Identity Wallet to the Server Implementation requesting a nonce.  The server will return a cryptographically generated nonce to be used for signature creation.  The server implementation should also at this time save the nonce and wallet address to the DB either as a new or existing user.

**Request Example**
```json
{
	"request": "nonce",
	"wallet": "0x1234abcd"
}
```
**Response: Success**
```json
{
	"nonce": "a1b2c3d4e5f6"
}
```
**Response: Error**
```json
{
	"error": "Internal Server Error"
}
```

### 6.d LWS_REQUEST
* **Source:** SK Identity Wallet
* **Target:** Server Implementation
* **Endpoint:** POST `/auth/selfkey`
* **Protocol:** HTTP Request
* **Description:** Submits an HTTP Request from the SelfKey Identity Wallet to the Server Implementation with a signature, data and documents for authentication.  A successful request will return a redirectUrl that will update the browser and send the user to a URL based on the server implementation configuration.

**Request Example**
```json
{
	"wallet": "0x1234abcd",
	"signature": "eyJyIjoiZGRlNjgwYTJkMDhjNTQ4ZWVkNjYwYzA0YWVmODdmYWU4MzM1ZDU0ZTk5YzljZjYxYzY5YWNkZmU3YzQyNWVjNCIsInMiOiIxNzE5NDU3NmE0M2NjYjE3MTE4NTVjMjljMGU0MzAyMTYzMmZkMjY2ZDAzNjhiMzZlODAwN2Q0OTdjZDE3ZjU1IiwidiI6Mjh9",
	"attributes": [
		{
			"key": "first_name",
			"value": "Bobby"
		},
		{
			"key": "last_name",
			"value": "Lee"
		},
		{
			"key": "email_address",
			"value": "bobby@bitcoin.com"
		},
		{
			"key": "phone_number",
			"value": "18001234567"
		}
	],
	"documents": [
		{
			"type": "passport",
			"mime-type": "image/jpg",
			"file": "path/to/file.jpg"
		}
	]
}
```
**Response: Success**
```json
{
	"message": "Authentication Successful",
	"redirectUrl": "/success.html"
}
```
**Response: Error**
```json
{
	"error": "Authentication Failed"
}
```
