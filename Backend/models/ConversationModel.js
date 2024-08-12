const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        default: "",
    },
    videoUrl: {
        type: String,
        default: "",
    },
    seen: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true
    });

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    recevier: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    messages: {
        type: mongoose.Types.ObjectId,
        ref: "Message",
    }
},
    {
        timestamps: true,
    })

const MessageModel = mongoose.model("Message", messageSchema);
const ConversationModel = mongoose.model("Conversation", conversationSchema)

module.exports = { 
    MessageModel,
    ConversationModel 
};