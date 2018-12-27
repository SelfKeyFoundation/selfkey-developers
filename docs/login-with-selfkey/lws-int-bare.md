---
id: lws-int-bare
title: Basic LWS Implementation
sidebar_label: GUIDE: Basic LWS
---

## Basic LWS Implementation

```
1 - LWS button on RP Website (Non-MKT, Non-KYCC)

Examples: Any normal website

Flows:

Signup

RP-UMS

1- GET		/auth/challenge 				=>	200: C-JWT                                   
2- POST	/auth/challenge	C-JWT + { sig }	=>	200: W-JWT		                    [ 400, 401 ]
3- POST	/users			W-JWT + { attr }	=>	201                                                 [ 400, 401 ]
4- GET		/auth/token		W-JWT		=>	200: User Token                             [ 401, 404 ]
5- POST	/login			{ token } 		=>	200: Custom Redirect/Session       [ 400, 401, 404 ]

Login

RP-UMS

1- GET		/auth/challenge 				=>	200: C-JWT
2- POST	/auth/challenge	C-JWT + { sig }	=>	200: W-JWT 				[ 400, 401 ]
3- GET		/auth/token		W-JWT		=>	200: User Token			[ 401, 404 ]
4 - POST	/login			{ token } 		=>	200: Custom Redirect/Session	[ 400, 401, 404 ]
```