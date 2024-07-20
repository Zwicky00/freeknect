import { communityDataType, userDataType } from "../../../types/user";
import { CHAT_TYPE, ChatResponseDataType } from "../constants";
import axios from "axios";
import { SERVER_ENDPOINT } from "../../../Config";

export async function fetchMultipleUsers(
  chat: ChatResponseDataType[],
  userMetaData: Record<string, userDataType>,
  communityMetaData: Record<string, communityDataType>
) {
  let users: string[] = [];
  let community: string[] = [];
  chat.forEach((element) => {
    if (element.kind === CHAT_TYPE.USER) {
      element.members.forEach((member) => {
        if (!(member in userMetaData)) {
          users.push(member);
        }
      });
    } else {
      if (!(element.community in communityMetaData)) {
        community.push(element.community);
      }
    }
  });
  const MultiUserDataUrl = `${SERVER_ENDPOINT}/api/fetchMultiUserDetails`;
  const response = await axios.post(
    MultiUserDataUrl,
    {
      dataRequest: {
        userRequests: users,
        communityRequests: community,
      },
    },
    {
      withCredentials: true,
    }
  );
  return [response.data.users, response.data.communities];
}

