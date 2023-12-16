// {"event_type": "join_room", "msg": "是螃蟹a丶 加入了编辑", "msg_id": "650exxxxxx", "ts": 1702044924}
export interface JoinRoomEvent {
    event_type: 'join_room';
    msg: string;
    msg_id: string;
    ts: number;
}
// Path: src/ws_client/websocket_event_type.ts
// {"event_type": "leave_room", "msg": "是螃蟹a丶 离开了编辑", "msg_id": "650exxxxxx", "ts": 1702044924}
export interface LeaveRoomEvent {
    event_type: 'leave_room';
    msg: string;
    msg_id: string;
    ts: number;
}
// Path: src/ws_client/websocket_event_type.ts
// {"event_type": "room_message", "msg": "# 你好", "sender": { "nickName": "是螃蟹a丶", "user_id": "xxxx" } , "msg_id": "650exxxxxx", "ts": 1702044924}
export interface RoomMessageEvent {
    event_type: 'room_message';
    msg: string;
    sender: {
        nickName: string;
        user_id: string;
        };
    msg_id: string;
    ts: number;
}
// Path: src/ws_client/websocket_event_type.ts
// {"event_type": "content_update", "msg": null, "content": "xxxx", "msg_id": "650exxxxxx", "ts": 1702044924}
export interface ContentUpdateEvent {
    event_type: 'content_update';
    msg: null;
    content: string;
    msg_id: string;
    ts: number;
}
// Path: src/ws_client/websocket_event_type.ts
// {"event_type": "line_update", "msg": null, "content": { "x": 1, "y": 1 }, "msg_id": "650exxxxxx", "ts": 1702044924}
export interface LineUpdateEvent {
    event_type: 'line_update';
    msg: null;
    content: {
        x: number;
        y: number;
        };
    msg_id: string;
    ts: number;
}