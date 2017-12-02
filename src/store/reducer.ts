import { Reducer } from "redux";
import User from "../domain/user";
import { GetUser, SavePlayer, GetOwnPlayer, GetPlayers } from "../service";
import { Player } from "../domain/player";
import { ChatActions, SocketHandler } from "../chat/init";
import { Message } from "../domain/message";

const Actions = {
    MESSAGE_WAS_SENT: 'MESSAGE_WAS_SENT',
    
    SETUSER: "SETUSER",
    STARTED_AUTHENTICATION: "STARTED_AUTHENTICATION",

    STARTED_FETCHING_CURR_USER: "STARTED_FETCHING_CURR_USER",
    FINISHED_FETCHING_CURR_USER: "FINISHED_FETCHING_CURR_USER",
    FAILED_FETCHING_CURR_USER: "FAILED_FETCHING_CURR_USER",

    FINISHED_FETCHING_CURR_PLAYER: "FINISHED_FETCHING_CURR_PLAYER",
    FAILED_FETCHING_CURR_PLAYER: "FAILED_FETCHING_CURR_PLAYER",

    STARTED_FETCHING_PLAYERS: "STARTED_FETCHING_PLAYERS",
    FINISHED_FETCHING_ALL_PLAYERS: "FINISHED_FETCHING_ALL_PLAYERS",
    FAILED_FETCHING_ALL_PLAYERS: "FAILED_FETCHING_ALL_PLAYERS",

    STARTED_SAVING_PLAYERS: "STARTED_SAVING_PLAYERS",
    FINISHED_SAVING_PLAYERS: "FINISHED_SAVING_PLAYERS",
    FAILED_SAVING_PLAYERS: "FAILED_SAVING_PLAYERS",

    STARTED_SAVING_PLAYER: "STARTED_SAVING_PLAYER",
    FINISHED_SAVING_PLAYER: "FINISHED_SAVING_PLAYER",
    FAILED_SAVING_PLAYER: "FAILED_SAVING_PLAYER"
}

export const ActionCreators = {
    sendMessge: (message: string) => {
        return (dispatch: any) => {
            SocketHandler.sendMessage(message);
        }
    },
    startedTypingMessage:() => {
        return(dispatch: any) => {
            SocketHandler.startedWriting();
        }
    },
    stopedTypingMessage:() => {
        return(dispatch: any) => {
            SocketHandler.stoppedWriting();
        }
    },
    savePlayer: (player: Player) => {
        return async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_SAVING_PLAYER })
            var id = await SavePlayer(player);
            dispatch({ type: Actions.FINISHED_SAVING_PLAYER, payload: id })
            dispatch(ActionCreators.getOwnPlayer());
        }
    },
    getOwnPlayer: () => {
        return async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_FETCHING_PLAYERS })
            var player = await GetOwnPlayer();
            dispatch({ type: Actions.FINISHED_FETCHING_CURR_PLAYER, payload: player })
        }
    },
    getAllPlayers: () => {
        return async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_FETCHING_PLAYERS })
            var players = await GetPlayers();
            dispatch({ type: Actions.FINISHED_FETCHING_ALL_PLAYERS, payload: players })
        }
    },
    authenticate: () => {
        return (dispatch: any) => {
            dispatch({ type: Actions.STARTED_AUTHENTICATION });
            window.location.href = '/auth/bnet';
        }
    },
    fetchCurrentUser: () => {
        return async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_FETCHING_CURR_USER })
            var user = await GetUser().catch(e => { dispatch({ type: Actions.FAILED_FETCHING_CURR_USER }) });
            dispatch({ type: Actions.FINISHED_FETCHING_CURR_USER, payload: user })
        }
    }
}

export interface IAction {
    type: string,
    payload?: any
}

export interface IApplicationState {
    currentUser: User,
    currentPlayer: Player,
    allPlayers: Player[],
    isLoadingUser: boolean,
    isFetchingPlayers: boolean,
    isSavingPlayer: boolean,
    error: string,
    messages: Message[],

}

const initalState: IApplicationState = {
    currentPlayer: null,
    allPlayers: [],
    currentUser: null,
    isLoadingUser: false,
    isSavingPlayer: false,
    isFetchingPlayers: false,
    error: null,
    messages: []
}

export const reducer: Reducer<IApplicationState> = (state: IApplicationState, action: IAction) => {

    switch (action.type) {
        case ChatActions.MESSAGE_WAS_RECIEVED: return { ...state, messages: [...state.messages, action.payload] }
        case ChatActions.SOMEOME_WENT_OFFLINE: return { ...state, }
        case Actions.STARTED_AUTHENTICATION: return { ...state, isLoadingUser: true }
        case Actions.STARTED_FETCHING_CURR_USER: return { ...state, isLoadingUser: true }
        case Actions.FINISHED_FETCHING_CURR_USER: return {
            ...state,
            isLoadingUser: false,
            currentUser: action.payload
        }
        case Actions.FAILED_FETCHING_CURR_USER: return {
            ...state,
            isLoadingUser: false,
            currentUser: null,
        }

        case Actions.STARTED_FETCHING_PLAYERS: return { ...state, isFetchingPlayers: true }
        case Actions.FAILED_FETCHING_ALL_PLAYERS:
        case Actions.FAILED_FETCHING_CURR_PLAYER: return { ...state, isFetchingPlayers: false, error: action.payload }
        case Actions.FINISHED_FETCHING_ALL_PLAYERS: return { ...state, isFetchingPlayers: false, allPlayers: action.payload }
        case Actions.FINISHED_FETCHING_CURR_PLAYER: return { ...state, isFetchingPlayers: false, currentPlayer: action.payload }

        case Actions.STARTED_SAVING_PLAYER: return { ...state, isSavingPlayer: true }
        case Actions.FINISHED_SAVING_PLAYER: return { ...state, isSavingPlayer: false }
        default: return initalState
    }
};
