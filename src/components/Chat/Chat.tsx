// import { useEffect } from "react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { userDataType } from "../../types/user";
import io from "socket.io-client";
import { ChatResponseDataType, FETCH_ALL_CHAT_URL } from "./constants";
import { getUtcDateTime } from "../../utils/DateUtils";
import axios from "axios";
const socket = io("http://localhost:1337", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  withCredentials: true,
  transports: ["websocket"],
});

const Chat = (props: { user: userDataType }) => {
  const [chat, setChat] = useState<ChatResponseDataType[]>([]);

  const [formData, setFormData] = useState({
    communityId: "",
    message: "",
  });
  useEffect(() => {
    const fetchAllChat = async () => {
      try {
        const response = await axios.get(FETCH_ALL_CHAT_URL, {
          withCredentials: true,
        });
        const chatInfo: ChatResponseDataType[] = response.data;
        setChat(chatInfo);
      } catch (error) {
        console.log("Failed to fetch the chat", error);
      }
    };
    fetchAllChat();
  }, []);
  useEffect(() => {
    socket.on("error", (message) => {
      return (
        <>
          <div className='alert alert-danger' role='alert'>
            {message}
          </div>
        </>
      );
    });
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnection attempt #${attempt}`);
    });
    socket.on("reconnect_failed", () => {
      console.log("Failed to reconnect after multiple attempts");
    });
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
    socket.on("acknowledgment", (info) => {
      console.log("acknowledgment", info);
    });
    socket.on("receive", (newChats) => {
      if (findChat(newChats)) {
        const updatedChat = chat;
        updatedChat.map((element) => {
          if (
            element.kind === newChats.kind &&
            element.members.every((member) =>
              newChats.members.includes(member)
            ) &&
            element.community === newChats.community
          ) {
            element.messageList.push(...newChats.messageList);
          }
        });
        setChat(updatedChat);
      } else {
        setChat(newChats);
      }
    });
    return () => {
      socket.off("error");
      socket.off("connect");
      socket.off("acknowledgment");
      socket.off("receive");
    };
  }, []);

  const findChat = (newMessage: any) => {
    return chat.some(
      (response) =>
        response.kind === newMessage.kind &&
        response.community === newMessage.community &&
        response.members.every((member) => newMessage.members.includes(member))
    );
  };
  const sendText = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("message", {
      sender: props.user._id,
      reciever: formData.communityId,
      kind: "User",
      content: formData.message,
      sentTime: getUtcDateTime(),
    });
  };
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div className='chatSideBar'></div>
      <form onSubmit={sendText}>
        <div>
          <label>
            Name:
            <input
              type='text'
              name='communityId'
              value={formData.communityId}
              onChange={handleTextChange}
              placeholder='TO:'
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type='text'
              name='message'
              value={formData.message}
              onChange={handleTextChange}
              placeholder='Please enter the message'
            />
          </label>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  );
};
export default Chat;
