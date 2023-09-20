declare namespace NodeJS {
  export interface ProcessEnv {
    readonly WEB_PORT: string;
    readonly WEB_HOST: string;

    readonly API_PORT: string;
    readonly API_HOST: string;
    readonly JWT_SECRET: string;
    readonly SECRET_KEY: string;

    readonly POSTGRES_USER: string;
    readonly POSTGRES_PASSWORD: string;
    readonly POSTGRES_DB: string;
    readonly POSTGRES_HOST: string;
    readonly POSTGRES_PORT: string;
    readonly DATABASE_URL: string;
  }
}
