import { SetStateAction } from "react";
import { communityDataType, userDataType } from "../../../types/user";
import { CHAT_TYPE, ChatResponseDataType } from "../constants";

const ChatTag = (props: {
  visibility: boolean;
  setCurrentConversation: React.Dispatch<SetStateAction<number>>;
  chat: ChatResponseDataType;
  extractReceiver: (
    chat: ChatResponseDataType | undefined
  ) => userDataType | communityDataType | null;
  index: number;
  newChatWindowToggle: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const receiver = props.extractReceiver(props.chat);
  if (props.chat.kind === CHAT_TYPE.USER) {
    const user: userDataType = receiver as userDataType;
    return (
      <>
        <button
          className={`chatTag ${props.visibility ? "selectedChat" : null}`}
          onClick={() => {
            props.newChatWindowToggle(false);
            props.setCurrentConversation(props.index);
          }}
        >
          {user.picture ? (
            <img className='chatLogo' src={user.picture} alt='Logo' />
          ) : (
            <span className='chatLogo material-symbols-outlined'>person</span>
          )}
          <span className='chatName'>
            {user.name ? user.name : "Anonymous User"}
          </span>
        </button>
      </>
    );
  } else {
    const community = props.extractReceiver(props.chat) as communityDataType;
    return (
      <>
        <button
          className={`chatTag ${props.visibility ? "selectedChat" : null}`}
          onClick={() => {
            props.newChatWindowToggle(false);
            props.setCurrentConversation(props.index);
          }}
        >
          <span className='material-symbols-outlined'>group</span>
          <span className='chatName'>
            {community.name ? community.name : "Anonymous User"}
          </span>
        </button>
      </>
    );
  }
};

export default ChatTag;
