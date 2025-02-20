const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid"); 
const ChatSession = require("../models/ChatSessionModel");
const Message = require("../models/MessageModel");


const startChat = asyncHandler(async (req, res) => {
    const { customerId } = req.body;
    const io = req.app.get("io");

    if (!customerId) {
        return res.status(400).json({ message: "Customer ID is required" });
    }

    let chatSession = await ChatSession.findOne({ customerId });

    if (!chatSession) {
        chatSession = await ChatSession.create({
            sessionId: uuidv4(),
            customerId,
        });
    }

    const welcomeMessage = await Message.create({
        sessionId: chatSession._id, 
        sender: "agent",
        message: "Welcome! How can we help you today?",
    });

    io.emit("new-message", welcomeMessage);

    res.status(201).json({ sessionId: chatSession.sessionId, welcomeMessage });
});


const sendMessage = asyncHandler(async (req, res) => {
    const { sessionId, message } = req.body;
    const io = req.app.get("io");

    if (!sessionId || !message) {
        return res.status(400).json({ message: "Chat session ID and message are required" });
    }

    const chatSession = await ChatSession.findById(sessionId);
    if (!chatSession) {
        return res.status(404).json({ message: "Chat session not found" });
    }

    const newMessage = await Message.create({
        sessionId,
        sender: "customer",
        message,
    });

    io.emit("new-message", newMessage); 

    res.status(201).json(newMessage);
});


const getChatMessages = asyncHandler(async (req, res) => {
    const { sessionId } = req.params;

    const messages = await Message.find({ sessionId }).sort({ createdAt: 1 });

    if (!messages.length) {
        return res.status(404).json({ message: "No messages found" });
    }

    res.status(200).json(messages);
});


const agentReply = asyncHandler(async (req, res) => {
    const { sessionId, message } = req.body;
    const agentId = req.user?._id; 
    const io = req.app.get("io");

    if (!sessionId || !message) {
        return res.status(400).json({ message: " session ID and message are required" });
    }

    if (!agentId) {
        return res.status(401).json({ message: "Unauthorized: Agent not authenticated" });
    }

    const chatSession = await ChatSession.findById(sessionId);
    if (!chatSession) {
        return res.status(404).json({ message: "Chat session not found" });
    }

    const agentMessage = await Message.create({
        sessionId,
        sender: "agent",
        senderId: agentId,
        message,
    });

    io.emit("new-message", agentMessage); 

    res.status(201).json(agentMessage);
});

module.exports = { startChat, sendMessage, getChatMessages, agentReply };
