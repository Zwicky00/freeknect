import { SetStateAction } from "react";

const NewChat = (props: {
  newChatWindowToggle: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div id='newChatWindow'>
      <button
        id='newChatWindowCloseButton'
        onClick={() => props.newChatWindowToggle(false)}
      >
        <span className='material-symbols-outlined'>close</span>
      </button>
      
    </div>
  );
};
export default NewChat;
