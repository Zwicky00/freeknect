import { GOOGLE_CLIENT_ID, OAUTH_REDIRECT_URL } from "../Config";
import {
  GOOGLE_ROOT_URL,
  GOOGLE_USER_INFO_EMAIL_URL,
  GOOGLE_USER_INFO_PROFILE_URL,
} from "../constatnts";

function getGoogleOAuthUrl() {
  const url = OAUTH_REDIRECT_URL as string;
  const options = {
    redirect_uri: url,
    client_id: GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [GOOGLE_USER_INFO_PROFILE_URL, GOOGLE_USER_INFO_EMAIL_URL].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${GOOGLE_ROOT_URL}?${qs.toString()}`;
}
export default getGoogleOAuthUrl;
