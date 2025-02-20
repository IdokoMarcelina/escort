const { Server } = require("socket.io");

const configureSockets = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("joinChat", (sessionId) => {
            socket.join(sessionId);
            console.log(`User joined chat: ${sessionId}`);
        });

        socket.on("customerMessage", ({ sessionId, message }) => {
            io.to(sessionId).emit("receiveMessage", { sender: "customer", message });
        });

        socket.on("agentReply", ({ sessionId, message }) => {
            io.to(sessionId).emit("receiveMessage", { sender: "agent", message });
        });

        socket.on("typing", (sessionId) => {
            io.to(sessionId).emit("agentTyping");
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
};

module.exports = configureSockets;
