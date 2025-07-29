

export { };

declare global {
    namespace Express {
        interface User {
            id: string;
            name?: string;
        }
    }
}
export interface User {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
}

export interface UserId {
    id: string;  // Or number, depending on your database schema
}

export interface DeserializedUser extends User {
  id: string;
  name: string;
  email: string;
  avatar: string;

}
