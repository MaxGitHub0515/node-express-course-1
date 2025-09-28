import Message from "../models/message.model.js";
import Conversation from "../models/conv.model.js"
import {StatusCodes} from "http-status-codes";
import { getRecieverSocketIDM, io } from "../socket/socket.js";


export const sendMessage = async(req, res) => {
    try {
      const {message} = req.body;
      // const recieverID = req.params.id
      const {id: recieverID} = req.params;
      const senderID = req.user._id;
      // find a participants array that includes ids of sender and reciever
      const conv = await Conversation.findOne({
        participants: {
          $all: [senderID, recieverID]
        }
      })
      // if sending msg for the first time
      if(!conv){
         conv = await Conversation.create({
          participants: [senderID, recieverID],
          // messages : [] by default
        })
      }
      // creating messages section
      
      const newMessage = new Message({
        senderID,
        recieverID,
        message
      });
      
      if(newMessage) {
        conv.messages.push(newMessage._id)
      }
      // takes longer to process
      // await conv.save()
      // await newMessage.save();
      // run at the same time; optimized
      await Promise.all([conv.save(), newMessage.save()])
      // socket.io here
      const recieverSocketID = getRecieverSocketID(recieverID);
      if(recieverSocketID) {
        //sending an event to specific user/client
        io.to(recieverSocketID).emit("newMessage", newMessage)
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

    const conv = await Conversation.findOne({
      participants:{$all:[senderID, userToChatId]} // getting all messages 
    }).populate("messages")

    if(!conv) return res.status(StatusCodes.NOT_FOUND).json([]);
    const messages = conv.messages;
    return res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({e: "Internal Server Error"})

  }
}


// finished here 1:10