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
        el: '.lwsClient',
        website: {
            name: 'LWS Example Site',
            url: 'https://yoursite.com/',
            termsUrl: 'https://yoursite/terms.html',
            policyUrl: 'https://yoursite.com/policy.html',
            apiUrl: 'https://yoursite.com/api/v1/selfkey/',
        },
        attributes: [
            {
                key: "first_name",
                label: "First Name",
                attribute: "http://platform.selfkey.org/schema/attribute/first-name.json"
            },
            {
                key: "last_name",
                label: "Last Name",
                attribute: "http://platform.selfkey.org/schema/attribute/last-name.json"
            },
            {
                key: "email",
                label: "Email",
                attribute: "http://platform.selfkey.org/schema/attribute/email.json"
            },
            {
                key: "passport",
                label: "Passport",
                attribute: "http://platform.selfkey.org/schema/attribute/passport.json"
            }
        ],
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
```
Message Sources:
lws_client
lws_content

Message Types:
wp_init
wp_teardown
wp_auth
```
