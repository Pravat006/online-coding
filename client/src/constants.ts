

export const SessionEventEnum = Object.freeze({

    // connected event
    CONNECTED_EVENT: "connected",
    // disconnected event
    DISCONNECTED_EVENT: "disconnected",
    // session created event
    CREATED_EVENT: "room-created",
    // session joined event
    JOINED_EVENT: "join-session",
    // session deleted event
    DELETED_EVENT: "room-deleted",

    // session left event
    LEFT_EVENT: "session-left",
    // session updated event
    UPDATED_EVENT: "updated",
    // session message event
    MESSAGE_EVENT: "chat-message",
    // session participant added event
    MESSAGE_DELETED_EVENT: "messagedeleted",
    // TYPING EVENT
    TYPING_EVENT: "typing",
    // stopped typing event
    STOP_TYPING_EVENT: "stopTyping",
    CODE_CHANGE_EVENT: "code-change",
    CODE_RECIEVE_EVENT: "recieve-code",
    CURSOR_UPDATE_EVENT: "cursor-update",
    RECIEVE_CURSOR_EVENT: "recieve-cursor",
    ERROR_EVENT: "error",
    // session error event
    SEND_MESSAGE_EVENT: "send-message",
    RECIEVE_MESSAGE_EVENT: "recieve-message",


})


