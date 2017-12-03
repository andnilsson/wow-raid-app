import { IAction } from "../store/reducer";
import { Store } from "redux";
var openSocket = require('socket.io-client');
const socket = openSocket(window.location.origin);

export const ChatActions = {
    MESSAGE_WAS_RECIEVED: 'MESSAGE_WAS_RECIEVED',
    SOMEONE_STARTED_WRITING: 'SOMEONE_STARTED_WRITING',
    SOMEONE_WENT_ONLINE: 'SOMEONE_WENT_ONLINE',
    SOMEOME_WENT_OFFLINE: 'SOMEOME_WENT_OFFLINE'
}

export const SocketHandler = {

    subscribetoSocket: (dispatch: (action: IAction) => void) => {
        // socket.on('chat-message', (message: string) => { dispatch({ type: ChatActions.MESSAGE_WAS_RECIEVED, payload: message }) });
        // socket.on('started-writing', (name: string) => { dispatch({ type: ChatActions.SOMEONE_STARTED_WRITING, payload: name }) });
        // socket.on('went-online', (name: string) => { dispatch({ type: ChatActions.SOMEONE_WENT_ONLINE, payload: name }) });
        // socket.on('went-offline', (name: string) => { dispatch({ type: ChatActions.SOMEOME_WENT_OFFLINE, payload: name }) });
    },
    sendMessage: (message: string) => {
        // socket.emit('chat-message', message);
    },
    startedWriting: () => {
        // socket.emit('started-writing');
    },
    stoppedWriting: () => {
        // socket.emit('stopped-writing');
    }
}


