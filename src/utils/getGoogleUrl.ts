import {
  GOOGLE_OAUTH_REDIRECT_URL,
  GOOGLE_ROOT_URL,
  GOOGLE_USER_INFO_EMAIL_URL,
  GOOGLE_USER_INFO_PROFILE_URL,
} from "../constatnts";

function getGoogleOAuthUrl() {
  const options = {
    redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [GOOGLE_USER_INFO_PROFILE_URL, GOOGLE_USER_INFO_EMAIL_URL].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${GOOGLE_ROOT_URL}?${qs.toString()}`;
}
export default getGoogleOAuthUrl;
