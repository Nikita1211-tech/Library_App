export interface register{
    firstname: string,
    lastname: string,
    email: string,
    profilepic: string,
    password: string,
    role: "User" | "Admin"
}