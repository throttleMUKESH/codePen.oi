/// <reference types="vite/client" />

// users Types
interface userInfoType {
    success: boolean,
    username: string,
    picture: string,
    email: string,
    savedCodes: Array<string>
}

interface loginCredentialsType {
    userId: string,
    password: string
}

interface signupCredentials {
    username: string,
    email: string,
    password: string

}
interface codeType {
    fullCode?: CompilerSliceStateType["fullCode"];
    title: string;
    _id?: string;
  }