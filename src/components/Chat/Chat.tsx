// import { useEffect } from "react";
import { FormEvent, useEffect, useState } from "react";
import { communityDataType, userDataType } from "../../types/user";
import io from "socket.io-client";
import {
  CHAT_TYPE,
  ChatResponseDataType,
  FETCH_ALL_CHAT_URL,
} from "./constants";
import { getUtcDateTime } from "../../utils/DateUtils";
import axios from "axios";
import { fetchMultipleUsers } from "./utils/users";
import "./Chat.css";
import ChatTag from "./subComponents/ChatTag";
import ChatSpace from "./subComponents/ChatSpace";
import NewChat from "./subComponents/NewChat";
const socket = io("http://localhost:1337", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  withCredentials: true,
  transports: ["websocket"],
});

const Chat = (props: { user: userDataType }) => {
  const [chat, setChat] = useState<ChatResponseDataType[]>([]);
  const [currentConversation, setCurrentConversation] = useState<number>(-1);
  const [userMetaData, setUserMetaData] = useState<
    Record<string, userDataType>
  >({});
  const [communityMetaData, setCommunityMetaData] = useState<
    Record<string, communityDataType>
  >({});
  const [newChatWindow, setNewChatWindow] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllChat = async () => {
      try {
        const response = await axios.get(FETCH_ALL_CHAT_URL, {
          withCredentials: true,
        });
        const chatInfo: ChatResponseDataType[] = response.data.sort(chatSort);
        setChat(chatInfo);
        fetchMetaData(chatInfo);
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
    socket.on("receive", async (newChats: ChatResponseDataType) => {
      await fetchMetaData([newChats]);
      if (findChat(newChats)) {
        const updatedChat = chat;
        updatedChat.forEach((element) => {
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
        const sortedChat = updatedChat.sort(chatSort);
        setChat(sortedChat);
      } else {
        setChat([newChats]);
      }
    });
    return () => {
      socket.off("error");
      socket.off("connect");
      socket.off("acknowledgment");
      socket.off("receive");
    };
  }, []);

  const chatSort = (a: ChatResponseDataType, b: ChatResponseDataType) => {
    const A_DateAndTime = new Date(
      a.messageList[a.messageList.length - 1].sentTime
    );
    const B_DateAndTime = new Date(
      b.messageList[a.messageList.length - 1].sentTime
    );
    if (A_DateAndTime < B_DateAndTime) {
      return -1;
    } else if (A_DateAndTime > B_DateAndTime) {
      return 1;
    } else {
      return 0;
    }
  };

  const fetchMetaData = async (chatInfo: ChatResponseDataType[]) => {
    try {
      const [newUsers, newCommunities]: Record<string, any>[] =
        await fetchMultipleUsers(chatInfo, userMetaData, communityMetaData);
      setUserMetaData((metaData) => ({ ...metaData, ...newUsers }));
      setCommunityMetaData((metaData) => ({
        ...metaData,
        ...newCommunities,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const extractReceiver = (chat: ChatResponseDataType | undefined) => {
    if (chat === undefined) {
      return null;
    } else if (chat.kind === CHAT_TYPE.USER) {
      let receiver: userDataType = {} as userDataType;
      chat.members.forEach((member) => {
        if (member !== props.user._id && member in userMetaData) {
          receiver = userMetaData[member];
        }
      });
      return receiver;
    } else {
      return communityMetaData[chat.community];
    }
  };

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
    console.log("Called");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const formObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    socket.emit("message", {
      sender: props.user._id,
      reciever: extractReceiver(chat[currentConversation]),
      kind: chat[currentConversation].kind,
      content: formObject["message"],
      sentTime: getUtcDateTime(),
    });
  };
  return (
    <div className='chatContent'>
      <div className={`btn btn-grp-vertical`} id='chatSideBar'>
        <button
          id='newChat'
          onClick={() => setNewChatWindow((state) => !state)}
        >
          <span className='material-symbols-outlined'>chat_add_on</span>
          <span className='newConversationText'>New Conversation</span>
        </button>
        {chat.map((element, index) => {
          if (element.kind === CHAT_TYPE.USER) {
            return (
              <ChatTag
                key={index}
                visibility={
                  extractReceiver(chat[currentConversation]) ===
                  extractReceiver(element)
                }
                setCurrentConversation={setCurrentConversation}
                extractReceiver={extractReceiver}
                chat={element}
                index={index}
                newChatWindowToggle={setNewChatWindow}
              />
            );
          } else {
            return (
              <ChatTag
                key={index}
                visibility={
                  extractReceiver(chat[currentConversation]) ===
                  extractReceiver(element)
                }
                setCurrentConversation={setCurrentConversation}
                extractReceiver={extractReceiver}
                chat={element}
                index={index}
                newChatWindowToggle={setNewChatWindow}
              />
            );
          }
        })}
      </div>
      <ChatSpace
        chatInfo={currentConversation !== -1 ? chat[currentConversation] : null}
        user={props.user}
        userMetaData={userMetaData}
        communityMetaData={communityMetaData}
        sendText={sendText}
      />
      {newChatWindow ? (
        <NewChat newChatWindowToggle={setNewChatWindow} />
      ) : null}
    </div>
  );
};
export default Chat;
