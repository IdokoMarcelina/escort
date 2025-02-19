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
    <h1>User Controller API Documentation</h1>

    <h2>1. Register User</h2>
    <p><strong>Method:</strong> POST</p>
    <p><strong>Endpoint:</strong> /api/users/register</p>
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
    <p><strong>Endpoint:</strong> /api/users/login</p>
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
    <p><strong>Endpoint:</strong> /api/users/logout</p>
    <p><strong>Description:</strong> Clears the authentication token from the cookie.</p>
    <pre>
    Response:
    {
        "message": "Successfully logged out"
    }
    </pre>

    <h2>4. Get User Profile</h2>
    <p><strong>Method:</strong> GET</p>
    <p><strong>Endpoint:</strong> /api/users/profile</p>
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
    <p><strong>Endpoint:</strong> /api/users/logged-in</p>
    <p><strong>Description:</strong> Verifies if a valid token exists in the cookie.</p>
    <pre>
    Response:
    true  (if logged in)
    false (if not logged in)
    </pre>

    <h2>6. Update User Profile</h2>
    <p><strong>Method:</strong> PATCH</p>
    <p><strong>Endpoint:</strong> /api/users/update</p>
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
    <p><strong>Endpoint:</strong> /api/users/change-password</p>
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
    <p><strong>Endpoint:</strong> /api/users/forgot-password</p>
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
    <p><strong>Endpoint:</strong> /api/users/reset-password/:resetToken</p>
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

</body>
</html>
`

module.exports = documentation;
