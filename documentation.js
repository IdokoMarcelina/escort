const documentation = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Controller API Documentation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        h1, h2 { color: #333; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>API Documentation</h1>
    
    <br/>
    <h3>Auth</h3>

    <p>base url: https://escort-1.onrender.com </p>


    <h2>1. Register User</h2>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/register</p>
    <p><strong>Description:</strong> Creates a new user and stores the token in a secure HTTP-only cookie.</p>
    <pre>
    Request Body:
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }

    Response:
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "token": "jwt_token_here"
    }
    </pre>

    <h2>2. Login User</h2>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/login</p>
    <p><strong>Description:</strong> Authenticates the user and sets the token in a secure cookie.</p>
    <pre>
    Request Body:
    {
        "email": "john@example.com",
        "password": "password123"
    }
    
    Response:
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "token": "jwt_token_here"
    }
    </pre>

    <h2>3. Logout User</h2>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/logout</p>
    <p><strong>Description:</strong> Clears the authentication token from the cookie.</p>
    <pre>
    Response:
    {
        "message": "Successfully logged out"
    }
    </pre>

    <h2>4. Get User Profile</h2>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/profile</p>
    <p><strong>Description:</strong> Fetches the logged-in user's profile data.</p>
    <pre>
    Response:
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "photo": "profile_url",
        "phone": "1234567890",
        "bio": "Short bio here"
    }
    </pre>

    <h2>5. Check Logged In Status</h2>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/logged-in</p>
    <p><strong>Description:</strong> Verifies if a valid token exists in the cookie.</p>
    <pre>
    Response:
    true  (if logged in)
    false (if not logged in)
    </pre>

    <h2>6. Update User Profile</h2>
    <p><strong>Method:</strong> PATCH</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/update</p>
    <p><strong>Description:</strong> Updates user information.</p>
    <pre>
    Request Body:
    {
        "name": "New Name",
        "phone": "0987654321"
    }
    
    Response:
    {
        "_id": "user_id",
        "name": "New Name",
        "phone": "0987654321"
    }
    </pre>

    <h2>7. Change Password</h2>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/change-password</p>
    <p><strong>Description:</strong> Allows users to change their password.</p>
    <pre>
    Request Body:
    {
        "oldPassword": "oldpassword123",
        "password": "newpassword123"
    }
    
    Response:
    "Password change successful"
    </pre>

    <h2>8. Forgot Password</h2>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/forgot-password</p>
    <p><strong>Description:</strong> Sends a password reset email with a token.</p>
    <pre>
    Request Body:
    {
        "email": "john@example.com"
    }
    
    Response:
    {
        "success": true,
        "message": "Reset email sent"
    }
    </pre>

    <h2>9. Reset Password</h2>
    <p><strong>Method:</strong> PATCH</p>
    <p><strong>Endpoint:</strong> https://escort-1.onrender.com/api/users/reset-password/:resetToken</p>
    <p><strong>Description:</strong> Resets the user's password using the reset token.</p>
    <pre>
    Request Body:
    {
        "password": "newpassword123"
    }
    
    Response:
    {
        "message": "Password reset successful, please login"
    }
    </pre>

    <h2>Token Storage</h2>
    <p>The token is stored in a secure HTTP-only cookie during registration and login:</p>
    <pre>
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "None",
        secure: true
    });
    </pre>
    <p>On logout, the token is cleared:</p>
    <pre>
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "None",
        secure: true
    });
    </pre>


     <h2>Chat Endpoints</h2>

    <h3>1. Start a Chat Session</h3>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> <code>https://escort-1.onrender.com/api/chats/start-chat</code></p>
    <p><strong>Description:</strong> Starts a new chat session for a customer.</p>
    <pre>
    Request Body:
    {
        "customerId": "customer_unique_id"
    }

    Response:
    {
        "sessionId": "chat_session_id",
        "customerId": "customer_unique_id",
        "status": "active"
    }
    </pre>

    <h3>2. Send a Message</h3>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> <code>https://escort-1.onrender.com/api/chats/send-message</code></p>
    <p><strong>Description:</strong> Sends a message from a customer or an agent.</p>
    <pre>
    Request Body:
    {
        "sessionId": "chat_session_id",
        "sender": "customer | agent",
        "message": "Hello, how can I help you?"
    }

    Response:
    {
        "messageId": "message_unique_id",
        "sessionId": "chat_session_id",
        "sender": "customer | agent",
        "message": "Hello, how can I help you?",
        "timestamp": "2025-02-20T12:00:00Z"
    }
    </pre>

    <h3>3. Get All Chat Sessions</h3>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> <code>https://escort-1.onrender.com/api/chats/get-sessions</code></p>
    <p><strong>Description:</strong> Fetches all active chat sessions.</p>
    <pre>
    Response:
    [
        {
            "sessionId": "chat_session_id",
            "customerId": "customer_unique_id",
            "status": "active"
        }
    ]
    </pre>

    <h3>4. Get Chat Messages</h3>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> <code>https://escort-1.onrender.com/api/chats/get-messages/:sessionId</code></p>
    <p><strong>Description:</strong> Retrieves messages for a specific chat session.</p>
    <pre>
    Response:
    {
        "sessionId": "chat_session_id",
        "messages": [
            {
                "messageId": "message_unique_id",
                "sender": "customer",
                "message": "Hello, I need help!",
                "timestamp": "2025-02-20T12:00:00Z"
            },
            {
                "messageId": "message_unique_id",
                "sender": "agent",
                "message": "Sure! How can I assist?",
                "timestamp": "2025-02-20T12:01:00Z"
            }
        ]
    }
    </pre>

    <h3>5. End a Chat Session</h3>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> <code>https://escort-1.onrender.com/api/chats/end-chat</code></p>
    <p><strong>Description:</strong> Ends a chat session.</p>
    <pre>
    Request Body:
    {
        "sessionId": "chat_session_id"
    }

    Response:
    {
        "message": "Chat session ended successfully"
    }
    </pre>

</body>
</html>
`

module.exports = documentation;
