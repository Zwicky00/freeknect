import { SERVER_ENDPOINT } from "../../Config";

export enum CHAT_TYPE {
  USER = "User",
  COMMUNITY = "Community",
}

export interface ChatResponseDataType {
  kind: string;
  members: string[];
  community: string;
  messageList: {
    sender: string;
    content: string;
    sentTime: string;
  }[];
}

export const FETCH_ALL_CHAT_URL = `${SERVER_ENDPOINT}/api/fetchAllChat`;
