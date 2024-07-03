/// <reference types="react-scripts" />

interface ProcessEnv {
  NODE_ENV: "development" | "production" | "test";
  REACT_APP_GOOGLE_CLIENT_ID: string;
  REACT_APP_SERVER_ENDPOINT: string;
  REACT_APP_OAUTH_REDIRECT_URL: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends ProcessEnv {}
}
