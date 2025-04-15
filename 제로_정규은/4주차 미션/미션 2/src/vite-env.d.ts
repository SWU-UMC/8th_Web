/// <reference types="vite/client" />
interface importMetaEnv {
    readonly VITE_SERVER_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}