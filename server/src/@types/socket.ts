import { Socket } from "socket.io";
import { User } from "./interface";
import type { Request } from "express";



export interface AuthenticatedSocket extends Socket {
    user: User;
}

// EVENT payload interfaces

export interface RoomIdPayload {
    roomId: string;
}

export interface MessagePayload {
    message: string;
}

export interface UserJoinPayload {
    roomId: string;
    user: User;
}

export interface UserLeavePayload {
    roomId: string;
    user: User;
}

export interface RoomCreatedPayload {
    roomId: string;
    message: string;
}

export interface RoomJoinedPayload {
    roomId: string;
    user: User;
}

export interface UserLeavePayload {
    roomId: string;
    user: User;
}

export interface EmitSocketParams {
    req: Request;
    roomId: string;
    event: string;
    payload:
    | MessagePayload
    | RoomIdPayload
    | UserJoinPayload
    | UserLeavePayload
    | RoomCreatedPayload
    | RoomJoinedPayload
    | Record<string, any>;
}


