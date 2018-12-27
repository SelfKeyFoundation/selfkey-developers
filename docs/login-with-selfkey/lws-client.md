---
id: lws-client
title: Client Configuration
sidebar_label: Client Configuration
---

## Client Library Overview
* Provides the Login with SelfKey Button
* Provides a Modal for displaying LWS related views
* Provides an iFrame embedded in the modal to view the Browser Extension
* Provides all assets for embedded components (CSS / JS / Images / Fonts)

## Including the Client Library File

You can add the client library via a CDN URL

```
<script src='https://unpkg.com/lws-js-client@1.0.0-beta.16/dist/lws.min.js'>
```

## Login with SelfKey Client Configuration

The Login with SelfKey client library accepts a configuration object containing the following attributes:

- **`path`** is fully-qualified URL or relative path to the Login with SelfKey API exposed by your web service
- **`el`** should be a dom element, array of dom elements or string representing a query selector
- **`website`** an object with links and routes related to the website being integrated
- **`attributes`** contains an optional array of additional identity attributes to request from the user's SelfKey ID Wallet referenced by their schema URL
- **`onAuthResponse`** contains an optional callback function which receives the response from the Response Endpoint. If you omit the `onAuthResponse` handler the Login with SelfKey client library will assume your application uses cookie-based authentication and make a POST request to the login endpoint to activate the user's session in the browser.

We currently support only one `lws.init` call and another can be made only after `lws.teardown`

## Configuration Example

```javascript

<script src='https://unpkg.com/lws-js-client@1.0.0-beta.16/dist/lws.min.js'></script>
<script>
    lws.init({
        ui: {
            el: '.lwsClient',
        },
        website: {
            name: 'LWS Example Site',
            url: 'https://yoursite.com/',
            termsUrl: 'https://yoursite/terms.html',
            policyUrl: 'https://yoursite.com/policy.html',
        },
        rootEndpoint: 'https://yoursite.com/api/v1/selfkey/',
        endpoints: {
            challenge: '',
            user:    ''
        },
        extensionId: '',
        attributes: [
            {
                key: "first_name",
                label: "First Name",
                attribute: "https://platform.selfkey.org/schema/attribute/first-name.json"
            },
            {
                key: "last_name",
                label: "Last Name",
                attribute: "https://platform.selfkey.org/schema/attribute/last-name.json"
            },
            {
                key: "email",
                label: "Email",
                attribute: "https://platform.selfkey.org/schema/attribute/email.json"
            },
            {
                key: "passport",
                label: "Passport",
                attribute: "https://platform.selfkey.org/schema/attribute/passport.json"
            }
        ],
        meta: {
            customKey: 'Value'
        },
        onAuthResponse: function (err, res) {
            console.log('OnAuthResponse', err, res);
            if (err) {
                alert('Error! ' + err.message);
                return;
            }
            alert(JSON.stringify(res));
        }
    });
</script>
```

## API

Here is a list of available attributes to add to the attributes array in the client configuration.

### Attributes

```javascript
{
    key: "first_name",
    label: "First Name",
    attribute: "http://platform.selfkey.org/schema/attribute/first-name.json"
}

{
    key: "middle_name",
    label: "Middle Name",
    attribute: "http://platform.selfkey.org/schema/attribute/middle-name.json"
}

{
    key: "last_name",
    label: "Last Name",
    attribute: "http://platform.selfkey.org/schema/attribute/last-name.json"
}

{
    key: "email",
    label: "Email Address",
    attribute: "http://platform.selfkey.org/schema/attribute/email.json"
}

{
    key: "nationality",
    label: "Nationality",
    attribute: "http://platform.selfkey.org/schema/attribute/nationality.json"
}

{
    key: "country_of_residency",
    label: "Country of Residency",
    attribute: "http://platform.selfkey.org/schema/attribute/country-of-residency.json"
}

{
    key: "birthdate",
    label: "Birthdate",
    attribute: "http://platform.selfkey.org/schema/attribute/birthdate.json"
}

{
    key: "physical_address",
    label: "Address",
    attribute: "http://platform.selfkey.org/schema/attribute/physical-address.json"
}

{
    key: "phonenumber_countrycode",
    label: "Phone Number",
    attribute: "http://platform.selfkey.org/schema/attribute/phonenumber-countrycode.json"
}

{
    key: "work_place",
    label: "Workplace",
    attribute: "http://platform.selfkey.org/schema/attribute/work-place.json"
}

{
    key: "tax_id_number",
    label: "Tax ID Number",
    attribute: "http://platform.selfkey.org/schema/attribute/tax-id-number.json"
}
```

### Documents

```javascript
{
    key: "bank_statement",
    label: "Bank Statement",
    attribute: "http://platform.selfkey.org/schema/attribute/bank-statement.json"
}

{
    key: "drivers_license",
    label: "Drivers License",
    attribute: "http://platform.selfkey.org/schema/attribute/drivers-license.json"
}

{
    key: "fingerprint",
    label: "Fingerprint",
    attribute: "http://platform.selfkey.org/schema/attribute/fingerprint.json"
}

{
    key: "id_selfie",
    label: "ID Selfie",
    attribute: "http://platform.selfkey.org/schema/attribute/id-selfie.json"
}

{
    key: "national_id",
    label: "National ID",
    attribute: "http://platform.selfkey.org/schema/attribute/national-id.json"
}

{
    key: "national_id_back",
    label: "National ID Back",
    attribute: "http://platform.selfkey.org/schema/attribute/national-id-back.json"
}

{
    key: "passport",
    label: "Passport",
    attribute: "http://platform.selfkey.org/schema/attribute/passport.json"
}

{
    key: "tax_certificate",
    label: "Tax Certificate",
    attribute: "http://platform.selfkey.org/schema/attribute/tax-certificate.json"
}

{
    key: "utility_bill",
    label: "Utility Bill",
    attribute: "http://platform.selfkey.org/schema/attribute/utility-bill.json"
}

{
    key: "voice_id",
    label: "Voice ID",
    attribute: "http://platform.selfkey.org/schema/attribute/voice-id.json"
}
```


## SelfKey Extension Protocol

### Error Types

* Expected
* No Wallet App Running
* Auth Failure
* Incompatible version error
* Config Errors
* Timeout error
* Connection Error
* No Extension 
* Element not found 


#### Unexpected
UnAuthorize failure when attributes with locked wallet

When there is no wallet created it should return an empty array but no error is raised

```
envelop: {
   "meta": {
      "id": “”,
      "src": “”,
      “origin”: “”,
    },
    “payload”: {},
    “type”: “”
    “error”: true | false 
}
```

#### app ⇔ extension:
```
app_init 
request:
response: 
“payload”: {
     ${config-obj}...     
 }

attributes:
request:
“payload”: {
     publicKey: “”,
     requestedAttributes: {}  
 }
response: 
“payload”: {
     attributes: [{
        key: “”,
        label: “”,
        document: true | false,
        data: {
    value: base64 of the document   
} | {}
}]
 }

wallets:
request:
“payload”: {
     ${config-obj}
     
 }
response: 
“payload”: [
    {
        publicKey:
        unlockStatus: true | false,
        signup: true | false,
        profile: “”
}    
 ]

unlock:
request:
“payload”: {
    Config: {}
    publicKey: “”
    password: “”
 }
response: 
“payload”: {
        publicKey:
        unlockStatus: true | false,
        signup: true | false,
        profile: “”
} 

auth:
request:
“payload”: {
    Config: {}
    publicKey: “”
}
response: 
“payload”: RP_Response_Object

signup:
request:
“payload”: {
    Config: {}
    publicKey: “”
    attributes: {} 
 }
response:
```

#### clientlib ⇔ extension:

```
wp_teardown
request:

wp_auth
response: 
“payload”: RP_Response_Object



wp_init 
request:
“payload”: {
    ${config-obj}...,
    clientVersion: “”
 }
response:
“payload”: connection_hash
Extension ⇔ id-wallet:

init
request:
“payload”: {
    version:
    clientVersion:
}

wallets 
unlock
attributes
auth
signup

```
