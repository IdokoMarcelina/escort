const express = require("express");
const router = express.Router();
const csurf = require("csurf");
const { startChat, sendMessage, getChatMessages, agentReply, getAgentChatList, closeChat } = require("../controllers/chatController");
const protect = require("../middleware/authMiddleware");



const csrfMiddleware = csurf({ cookie: true }); 

router.get("/csrf-token", (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

router.post("/start-chat", startChat);

router.post("/send-message", sendMessage);

router.get("/chat/:sessionId", getChatMessages);

router.post("/agent-reply", protect, agentReply);
router.post("/agent-chat-list", protect, getAgentChatList);
router.post("/close-chat", protect, closeChat);

module.exports = router;
