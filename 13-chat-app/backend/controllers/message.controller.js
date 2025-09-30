import Message from "../models/message.model.js";
import Conversation from "../models/conv.model.js"
import {StatusCodes} from "http-status-codes";
import { getReceiverSocketID, io } from "../socket/socket.js";

 
export const sendMessage = async(req, res) => {
    try {
      const {message} = req.body;
      // const recieverID = req.params.id
      const {id: receiverID} = req.params;
      const senderID = req.user._id;
      // find a participants array that includes ids of sender and reciever
      let conversation = await Conversation.findOne({
        participants: {
          $all: [senderID, receiverID]
        }
      })
      // if sending msg for the first time
      if(!conversation){
         conversation = await Conversation.create({
          participants: [senderID, receiverID]
          // messages : [] by default
        })
      }
      // creating messages section
      
      const newMessage = new Message({
        senderID,
        receiverID,
        message
      });
      
      if(newMessage) {
        conversation.messages.push(newMessage._id)
      }
      // takes longer to process
      // await conv.save()
      // await newMessage.save();
      // run at the same time; optimized
      await Promise.all([conversation.save(), newMessage.save()])
      // socket.io here
      const receiverSocketID = getReceiverSocketID(receiverID);
      if(receiverSocketID) {
        //sending an event to specific user/client
        io.to(receiverSocketID).emit("newMessage", newMessage)
      } 
      res.status(StatusCodes.CREATED).json(newMessage)


    } catch (error) {
      console.log("Error in sendMessage controller", error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({e: "Internal Server Error"})
 
    }
}   


export const getMessages = async(req, res) => {
  try{
    const {id:userToChatId} = req.params;
    const senderID = req.user._id;

    const conversation = await Conversation.findOne({
      participants:{$all:[senderID, userToChatId]} // getting all messages 
    }).populate("messages")

    if(!conversation) return res.status(StatusCodes.NOT_FOUND).json([]);
    const messages = conversation.messages;
    return res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({e: "Internal Server Error"})

  }
}


// finished here 1:10