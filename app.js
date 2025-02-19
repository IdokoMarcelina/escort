
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require('path')
const errorHandler = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const connectDB = require("./config/connectDB"); 




const userRoutes = require('./routes/userRoutes');
const documentation = require("./documentation");


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(errorHandler);
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, "uploads")))

connectDB();


const PORT = process.env.PORT || 4000

app.use('/api/users', userRoutes)


app.get("/", (req, res) => {
    const acceptHeader = req.headers.accept;

    if (acceptHeader && acceptHeader.includes("application/json")) {
        res.json({
            message: "Welcome to the API. Visit /docs for HTML documentation.",
            endpoints: {
                register: "/register",
                login: "/login",
                logout: "/logout",
                getUser: "/user",
                loggedIn: "/loggedIn",
                updateUser: "/updateUser",
                changePassword: "/changePassword",
                forgotPassword: "/forgotPassword",
                resetPassword: "/resetpassword/:resetToken"
            }
        });
    } else {
        res.setHeader("Content-Type", "text/html");
        res.send(documentation);
    }
});


app.listen(PORT , console.log(`server running on port ${PORT}`)
)