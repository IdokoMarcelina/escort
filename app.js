
require("dotenv").config()
const express = require("express")
const http = require("http"); 
const configureSockets = require("./socket"); 
const bodyParser = require("body-parser");
const cors = require("cors")
const path = require('path')
const errorHandler = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const csurf = require("csurf");
const connectDB = require("./config/connectDB"); 




const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const documentation = require("./documentation");


const app = express()
const server = http.createServer(app);
const io = configureSockets(server); 

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(
    cors({
        origin: "*", 
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    })
)

app.use(errorHandler);
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, "uploads")))


connectDB();

app.set("io", io);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("new-message", (data) => {
    console.log("New message received:", data);
    io.emit("new-message", data); 
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 4000

app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)


// const csrfMiddleware = csurf({ cookie: true });
// app.use(csrfMiddleware);

app.get("/api/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

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


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// app.listen(PORT , console.log(`server running on port ${PORT}`)
// )


