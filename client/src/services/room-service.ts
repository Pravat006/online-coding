import Axios from "@/config/axio-instance";




class RoomService {
   createRoom= async (roomName:string)=> await Axios.post("/room/create", {roomName});
   joinRoom= async (id:string)=> await Axios.post(`/room/join/${id}`);
   leaveRoom= async (id:string)=> await Axios.post(`/room/leave/${id}`);
   deleteRoom= async (id:string)=> await Axios.delete(`/room/delete/${id}`);
}

export const roomService = new RoomService();
