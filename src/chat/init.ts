import { IAction } from "../store/reducer";
import { Store } from "redux";
var openSocket = require('socket.io-client');
const socket = openSocket(window.location.origin);

export const ChatActions = {
    MESSAGE_WAS_RECIEVED: 'MESSAGE_WAS_RECIEVED'
}

export const SocketHandler = {

    subscribetoSocket: (dispatch: (action: IAction) => void) => {
        socket.on('chat-message', (message: string) => { dispatch({ type: ChatActions.MESSAGE_WAS_RECIEVED, payload: message }) });
    },
    sendMessage: (message: string) => {
        socket.emit('chat-message', message);
    }
}


