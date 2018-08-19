---
id: lws-api
title: API Docs
sidebar_label: API Docs
---

# Preflight
This part of the system is running before in the background before any user interaction takes place.  The purpose is to verify successful connections between the Integrating Client Implementation, SelfKey Connect Browser Extension, SelfKey Identity Wallet and the Integrating LWS API Implementation.  If all connections are working then when the user clicks the Login with SelfKey button in the browser, the authentication process with begin successfully, otherwise an error message with instructions will be displayed to the user explaining which component is not working and instructions on how to download and run the missing component (Browser Extension or Wallet App) This will also handle any errors from the 3rd party implementation having connection issues, for example if the API Implementation is down.

## 1: Preflight Connect Checks

### 1.a: LWS_INIT
* **Source:** Client Implementation
* **Target:** SK Connect Content Script
* **Endpoint:**  `/LWS_INIT`
* **Protocol:**  Chrome Messaging

**Request Example**
```json
{
	"message": "ping"
}
```
**Response: Success**
```json
{
	"message": "Successfully connected to SelfKey Connect"
}
```
**Response: Error**
```json
{
	"error": "Cannot connect to SelfKey Connect"
}
```

### 1.b: CONNECT
* **Source:** SK Connect Content Script
* **Target:** SK Connect Background Script
* **Endpoint:**  `/CONNECT`
* **Protocol:**  Chrome Messaging

**Request Example**
```json
{
	"message": "ping"
}
```
**Response: Success**
```json
{
	"message": "Successfully connected to Background Script"
}
```
**Response: Error**
```json
{
	"error": "SelfKey Connect Internal Error"
}
```

### 1.c CONNECT
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:**  `/CONNECT`
* **Protocol:**  Websocket Connection

**Request Example**
```json
{
	"message": "ping"
}
```
**Response: Success**
```json
{
	"message": "Successfully connected to SelfKey Identity Wallet"
}
```
**Response: Error**
```json
{
	"error": "Error connecting to SelfKey Identity Wallet"
}
```

### 1.d CONNECT
* **Source:** SK Identity Wallet
* **Target:** Server Implementation
* **Endpoint:**  `/CONNECT`
* **Protocol:**  HTTP Request

**Request Example**
```json
{
	"message": "ping"
}
```
**Response: Success**
```json
{
	"message": "Successfully connected to LWS API Implementation"
}
```
**Response: Error**
```json
{
	"error": "Error connecting to Integration Server"
}
```



# Authentication Flow
After the preflight checks are successful and all components are installed, running and communicating successfully, the actual authentication flow can begin. 

## 2: Client Authentication Request

### 2.a AUTH_REQUEST
* **Source:** Client Implementation
* **Target:** SK Connect Content Script
* **Endpoint:**  `/AUTH_REQUEST`
* **Protocol:**  Chrome Messaging

**Request Example**
```json
{
	"message": "auth"
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


## 3: Available Wallets

### 3.a WALLETS_REQUEST
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:**  `/WALLETS_REQUEST`
* **Protocol:**  Chrome Messaging

**Request Example**
```json
{
	"message": "getWallets"
}
```
**Response: Success**
```json
{
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
	"error": "No Wallets Found"
}
```

### 3.b WALLETS_REQUEST
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:**  `/WALLETS_REQUEST`
* **Protocol:**  Websocket Connection

**Request Example**
```json
{
	"message": "getWallets"
}
```
**Response: Success**
```json
{
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
	"error": "No Wallets Found"
}
```


## 4: JSON Keystore Unlock

### 4.a UNLOCK
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:**  `/UNLOCK`
* **Protocol:**  Chrome Messaging

**Request Example**
```json
{
	"wallet": "0xabcd1234",
	"password": "pass1234"
}
```
**Response: Success**
```json
{
	"message": "Wallet Unlocked Successfully"
}
```
**Response: Error**
```json
{
	"error": "Invalid Credentials"
}
```

### 4.b UNLOCK
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:**  `/UNLOCK`
* **Protocol:**  Websockets Connection

**Request Example**
```json
{
	"wallet": "0xabcd1234",
	"password": "pass1234"
}
```
**Response: Success**
```json
{
	"message": "Wallet Unlocked Successfully"
}
```
**Response: Error**
```json
{
	"error": "Invalid Credentials"
}
```


## 5: Request Attributes and Documents

### 5.a ATTR_REQ
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:**  `/ATTR_REQ`
* **Protocol:**  Chrome Messaging

**Request Example**
```json
{
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
	"error": "Attrbute Missing"
}
```

### 5.b ATTR_REQ
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:**  `/ATTR_REQ`
* **Protocol:**  Websockets Connection

**Request Example**
```json
{
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
	"error": "Attrbute Missing"
}
```

## 6: Server Authentication Request

### 6.a AUTH_REQ
* **Source:** SK Connect iFrame
* **Target:** SK Connect Background Script
* **Endpoint:**  `/AUTH_REQUEST`
* **Protocol:**  Chrome Messaging

**Request Example**
```json
{
	"wallet": "0x1234abcd",
	"signature": "{\"r\":{\"type\":\"Buffer\",\"data\":[215,252,52,209,99,115,65,20,176,235,54,88,127,105,159,87,211,198,96,96,196,194,207,121,162,11,40,127,82,95,131,13]},\"s\":{\"type\":\"Buffer\",\"data\":[80,25,172,33,158,87,250,185,205,28,213,156,102,150,182,82,245,78,175,18,35,87,16,123,160,10,197,42,163,156,2,58]},\"v\":28}",
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

### 6.b AUTH_REQ
* **Source:** SK Connect Background Script
* **Target:** SK Identity Wallet
* **Endpoint:**  `/AUTH_REQUEST`
* **Protocol:**  Websockets Connection

**Request Example**
```json
{
	"wallet": "0x1234abcd",
	"signature": "{\"r\":{\"type\":\"Buffer\",\"data\":[215,252,52,209,99,115,65,20,176,235,54,88,127,105,159,87,211,198,96,96,196,194,207,121,162,11,40,127,82,95,131,13]},\"s\":{\"type\":\"Buffer\",\"data\":[80,25,172,33,158,87,250,185,205,28,213,156,102,150,182,82,245,78,175,18,35,87,16,123,160,10,197,42,163,156,2,58]},\"v\":28}",
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

### 6.c LWS_REQUEST
* **Source:** SK Identity Wallet
* **Target:** Server Implementation
* **Endpoint:**  `/LWS_REQUEST`
* **Protocol:**  HTTP Request

**Request Example**
```json
{
	"wallet": "0x1234abcd",
	"signature": "{\"r\":{\"type\":\"Buffer\",\"data\":[215,252,52,209,99,115,65,20,176,235,54,88,127,105,159,87,211,198,96,96,196,194,207,121,162,11,40,127,82,95,131,13]},\"s\":{\"type\":\"Buffer\",\"data\":[80,25,172,33,158,87,250,185,205,28,213,156,102,150,182,82,245,78,175,18,35,87,16,123,160,10,197,42,163,156,2,58]},\"v\":28}",
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
