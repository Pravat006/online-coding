

export const RoomEventEnum = Object.freeze({

    // connected event
    CONNECTED_EVENT: "connected",
    // disconnected event
    DISCONNECTED_EVENT: "disconnected",

    // room created event
    CREATED_EVENT: "created-room",

    // this event is triggered when a room is deleted
    DELETED_EVENT: "deleted-room",

    //user  room joined event
    USER_JOINED_EVENT: "user-joined",
    // user room left event
    USER_LEFT_EVENT: "user-left",

    // room  updated event
    UPDATED_EVENT: "updated",

    //message event
    MESSAGE_EVENT: "message",

    // room message event
    SEND_MESSAGE_EVENT: "send-message",

    // room participant added event
    MESSAGE_DELETED_EVENT: "delete-message",

    // TYPING EVENT
    TYPING_EVENT: "typing",

    // stopped typing event
    STOP_TYPING_EVENT: "stop-typing",

    // events to handle code changes on the room
    CODE_CHANGE_EVENT: "code-change",

    // code change event
    CODE_CHANGE_DELETED_EVENT: "code-change-deleted",

    // code synced event
    CODE_SYNCED_EVENT: "code-synced",

    // error event
    ERROR_EVENT: "error",


})


