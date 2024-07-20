import { FormEvent } from "react";
import { communityDataType, userDataType } from "../../../types/user";
import { CHAT_TYPE, ChatResponseDataType } from "../constants";
import { extractDate, extractTime } from "../utils/DateTime";
const ChatSpace = (props: {
  chatInfo: ChatResponseDataType | null;
  user: userDataType;
  userMetaData: Record<string, userDataType>;
  communityMetaData: Record<string, communityDataType>;
  sendText: (event: FormEvent<HTMLFormElement>) => void;
}) => {
  let lastDate: string = "";
  if (props.chatInfo) {
    if (props.chatInfo.kind === CHAT_TYPE.USER) {
      return (
        <div className='chatSpace'>
          <div className='message-List'>
            {props.chatInfo.messageList.map((message, index) => {
              const currentTime = extractTime(message.sentTime);
              const dateChange = extractDate(message.sentTime) !== lastDate;
              lastDate = extractDate(message.sentTime);
              return (
                <div key={index}>
                  <div className='message-date'>
                    <span>{dateChange ? lastDate : null}</span>
                  </div>
                  <div
                    className={`message ${message.sender === props.user._id ? "message-self" : "message-other"}`}
                    key={index}
                  >
                    <img
                      className='message-logo'
                      src={props.userMetaData[message.sender].picture}
                      alt='logo'
                    />
                    <div className='message-content'>
                      <div className='message-text'>
                        <span>{message.content}</span>
                      </div>
                      <div className='message-time'>
                        <span>{currentTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={props.sendText} className='message-send'>
            <input
              name='message'
              type='text'
              id='new-message-content'
              placeholder='Message'
              autoComplete='off'
            />
            <button type='submit' className='material-symbols-outlined'>
              send
            </button>
          </form>
        </div>
      );
    } else {
      return <h1>Need to do</h1>;
      // return (
      //   <>
      //     <div className='message-List'>
      //       {props.chatInfo.messageList.map((message, index) => {
      //         return (
      //           <>
      //             <div
      //               className={`message ${message.sender === props.user._id ? "message-self" : "message-other"}`}
      //               key={index}
      //             >
      //               <img
      //                 className='message-logo'
      //                 src={props.userMetaData[message.sender].picture}
      //                 alt='logo'
      //               />
      //               <div className='message-content'>
      //                 <div className='message-sender'>
      //                   <span>{props.userMetaData[message.sender].name}</span>
      //                 </div>
      //                 <div className='message-text'>
      //                   <span>{message.content}</span>
      //                 </div>
      //                 <div className='message-time'>
      //                   <span>{message.sentTime}</span>
      //                 </div>
      //               </div>
      //             </div>
      //           </>
      //         );
      //       })}
      //     </div>
      //   </>
      // );
    }
  } else {
    return <></>;
  }
};
export default ChatSpace;
