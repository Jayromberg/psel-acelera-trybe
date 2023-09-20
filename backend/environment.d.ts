declare namespace NodeJS {
  export interface ProcessEnv {
    readonly API_PORT: string;
    readonly JWT_SECRET: string;
    readonly SECRET_KEY: string;
  }
}
