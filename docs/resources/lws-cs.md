---
id: lws-cs
title: C# .NET
---

<img src='/img/csharp.png' width='240px'>

## C# ASPNet SDK

### Server Library

https://github.com/SelfKeyFoundation/selfkey-net

SelfKey.NET is the SelfKey platform to support our partners using .NET including .NET Core, .NET Standard and ASP.NET Core 2.1.

 * **SelfKey.Login.Api** is a .NET Standard API for .NET client applications to leverage Login with SelfKey capabilities.
 * **SelfKey.Login.Data** is a class library containing the models required for transmitting data for use with Login with SelfKey.

### SelfKey.Login.Api

 * This module provides a single static class (`Signer`) for signing and verifying messages using [Nethereum](https://nethereum.com/).  It may be added as a dependency to any .NET project supporting [.NET Standard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) 2.0.
 * Call `Sign` to sign a message.  You may pass a private key as a string or an `EthECKey` object.  The method will return a signature that can be used to verify the message later.
 * Call `Verify` to verify a message using a passed signature.  It will verify that the recovered public key matches the address provided (passed in).
 
### SelfKey.Login.Data

 * This module provides a set of model entity classes based on a JSON schema to be used for transmitting data.  It may be added as a dependency to any .NET project supporting [.NET Standard](https://docs.microsoft.com/en-us/dotnet/standard/net-standard) 2.0.
 * The JSON schema is included as [login-schema.json](SelfKey.Login.Data/login-schema.json) which describes a payload that can be used for any RESTful web API intended to receive Login with SelfKey data.
 * The model entity classes (in [LoginClasses.cs](SelfKey.Login.Data/Models/LoginClasses.cs)) are automatically generated by the [NSwag](https://github.com/RSuter/NSwag) toolchain during the build (if they are out of date).  This uses [nswag.json](SelfKey.Login.Data/nswag.json) which was generated using [NSwagStudio](https://github.com/RSuter/NSwag/wiki/NSwagStudio) and can be updated using this application if ever required.

### Development

To develop and build locally, open `SelfKey.NET.sln` in Visual Studio 2017.


## Demo Implementation

https://github.com/SelfKeyFoundation/selfkey-aspnetcore-demo

SelfKey ASP.NET Core Demo provides a demo project using an ASP.NET Core Web API to demonstrate how to use SelfKey.NET to leverage the signing and verification of messages via a RESTful web interface.

### SelfKey.Login.Service

 * This project consists of a controller class (`SelfKeyController`) which exposes several routing methods.
 * The `Sign` method takes a JSON payload based on **SelfKey.Login.Data** and a private key which is then signed using **SelfKey.Login.Api**.  The payload is modified with a signature and returned as a result.
 * The `Verify` method takes a JSON payload based on **SelfKey.Login.Data** which is then verified using **SelfKey.Login.Api**.  A status code of 200 (OK) is returned if successful; otherwise 400 (Bad Request) is returned.

### Development

To develop and build locally, open `SelfKey.AspNetCore.Demo.sln` in Visual Studio 2017 15.7 or newer.  You will also need [.NET Core SDK 2.1](https://www.microsoft.com/net/download/dotnet-core/2.1) or newer installed.  Press F5 to run in the debugger.  It will open your browser at a listening endpoint.

#### Usage

A Postman collection ([SelfKey.postman_colletion.json](SelfKey.postman_colletion.json)) is provided in the solution.  This provides two example requests:

 * A `Sign` request which contains an empty signature.
 * A `Verify` request which contains the signature that would be in the payload returned by the `Sign` request.
