declare namespace NodeJS {
  export interface ProcessEnv {
    readonly WEB_PORT: string;
    readonly API_PORT: string;
    readonly POSTGRES_USER: string;
    readonly POSTGRES_PASSWORD: string;
  }
}
