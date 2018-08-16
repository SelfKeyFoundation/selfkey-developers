---
id: lws-client
title: Client Configuration
sidebar_label: Client Configuration
---

## Client Library Overview
* Provides the Login with SelfKey Button
* Provides a Modal for displaying LWS related views
* Provides an iFrame embedded in the modal to view the Browser extension
* Provides all assets for embedded components (CSS/JS/Images/Fonts)

## Login with SelfKey Client Configuration

The Login with SelfKey client library accepts a configuration object containing the following attributes:

- **`path`** is fully-qualified URL or relative path to the Login with SelfKey API exposed by your web service,
- **`attributes`** contains an optional array of additional identity attributes to request from the user's SelfKey ID Wallet referenced by their schema URL, and
- **`onAuthResponse`** contains an optional callback function which receives the response from the Response Endpoint. If you omit the `onAuthResponse` handler the Login with SelfKey client library will assume your application uses cookie-based authentication and make a POST request to the login endpoint to activate the user's session in the browser.

For example:

```javascript
const config = {
  path: "/api/v1/auth/selfkey",
  attributes: [
    {
      key: "firstname",
      label: "First Name",
      attribute: "http://platform.selfkey.org/schema/attribute/first-name.json"
    },
    {
      key: "lastname",
      label: "Last Name",
      attribute: "http://platform.selfkey.org/schema/attribute/last-name.json"
    }
  ],
  onAuthResponse: (err, response) => {
    // Handle server response
  }
};
```