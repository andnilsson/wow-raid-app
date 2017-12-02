"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var openSocket = require('socket.io-client');
const socket = openSocket(window.location.origin);
exports.ChatActions = {
    MESSAGE_WAS_RECIEVED: 'MESSAGE_WAS_RECIEVED',
    SOMEONE_STARTED_WRITING: 'SOMEONE_STARTED_WRITING',
    SOMEONE_WENT_ONLINE: 'SOMEONE_WENT_ONLINE',
    SOMEOME_WENT_OFFLINE: 'SOMEOME_WENT_OFFLINE'
};
exports.SocketHandler = {
    subscribetoSocket: (dispatch) => {
        socket.on('chat-message', (message) => { dispatch({ type: exports.ChatActions.MESSAGE_WAS_RECIEVED, payload: message }); });
        socket.on('started-writing', (name) => { dispatch({ type: exports.ChatActions.SOMEONE_STARTED_WRITING, payload: name }); });
        socket.on('went-online', (name) => { dispatch({ type: exports.ChatActions.SOMEONE_WENT_ONLINE, payload: name }); });
        socket.on('went-offline', (name) => { dispatch({ type: exports.ChatActions.SOMEOME_WENT_OFFLINE, payload: name }); });
    },
    sendMessage: (message) => {
        socket.emit('chat-message', message);
    },
    startedWriting: () => {
        socket.emit('started-writing');
    },
    stoppedWriting: () => {
        socket.emit('stopped-writing');
    }
};
//# sourceMappingURL=init.js.map