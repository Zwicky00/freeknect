/// <reference types="react-scripts" />

interface ProcessEnv {
  NODE_ENV: "development" | "production" | "test";
  REACT_APP_GOOGLE_CLIENT_ID: string;
}

declare namespace NodeJS {
  interface ProcessEnv extends ProcessEnv {}
}
