import { Reducer } from "redux";
import User from "../domain/user";
import { Post, Get, Delete } from "../service";
import { Player } from "../domain/player";
import { ChatActions, SocketHandler } from "../chat/init";
import { Message } from "../domain/message";
import * as en from 'linq';
import { BoardMessage } from "../domain/boardMessage";

const Actions = {
    MESSAGE_WAS_SENT: 'MESSAGE_WAS_SENT',
    FETCHING_MESSAGES: 'FETCHING_MESSAGES',
    FETCHED_MESSAGES: 'FETCHED_MESSAGES',
    FETCHED_ONLINEUSERS: 'FETCHED_ONLINEUSERS',

    SETUSER: "SETUSER",
    STARTED_AUTHENTICATION: "STARTED_AUTHENTICATION",

    STARTED_FETCHING_CURR_USER: "STARTED_FETCHING_CURR_USER",
    FINISHED_FETCHING_CURR_USER: "FINISHED_FETCHING_CURR_USER",
    FAILED_FETCHING_CURR_USER: "FAILED_FETCHING_CURR_USER",

    FINISHED_FETCHING_OWN_PLAYER: "FINISHED_FETCHING_OWN_PLAYER",
    FAILED_FETCHING_OWN_PLAYER: "FAILED_FETCHING_OWN_PLAYER",

    FINISHED_FETCHING_SINGLE_PLAYER: "FINISHED_FETCHING_SINGLE_PLAYER",
    FAILED_FETCHING_SINGLE_PLAYER: "FAILED_FETCHING_SINGLE_PLAYER",

    STARTED_FETCHING_PLAYERS: "STARTED_FETCHING_PLAYERS",
    FINISHED_FETCHING_ALL_PLAYERS: "FINISHED_FETCHING_ALL_PLAYERS",
    FAILED_FETCHING_ALL_PLAYERS: "FAILED_FETCHING_ALL_PLAYERS",

    STARTED_DELETING_PLAYER: "STARTED_DELETING_PLAYER",
    FINISHED_DELETING_PLAYER: "FINISHED_DELETING_PLAYER",

    STARTED_SAVING_PLAYERS: "STARTED_SAVING_PLAYERS",
    FINISHED_SAVING_PLAYERS: "FINISHED_SAVING_PLAYERS",
    FAILED_SAVING_PLAYERS: "FAILED_SAVING_PLAYERS",

    STARTED_SAVING_PLAYER: "STARTED_SAVING_PLAYER",
    FINISHED_SAVING_PLAYER: "FINISHED_SAVING_PLAYER",
    FAILED_SAVING_PLAYER: "FAILED_SAVING_PLAYER",

    STARTED_FETCHING_BOARD: "STARTED_FETCHING_BOARD",
    FINISHED_FETCHING_BOARD: "FINISHED_FETCHING_BOARD",
    FAILED_FETCHING_BOARD: "FAILED_FETCHING_BOARD",
    FINISHED_DELETING_BOARD: 'FINISHED_DELETING_BOARD',

    STARTED_SAVING_BOARD_MESSAGE: "STARTED_SAVING_BOARD_MESSAGE",
    FINISHED_SAVING_BOARD_MESSAGE: "FINISHED_SAVING_BOARD_MESSAGE",
    FAILED_SAVING_BOARD_MESSAGE: "FAILED_SAVING_BOARD_MESSAGE",
}

export const ActionCreators = {
    deleteBoardMessage: (id: string) => {
        return (async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_FETCHING_BOARD });

            await Delete(`board/${id}`)

            dispatch(ActionCreators.fetchBoardMessages());
        })
    },
    deletePlayer: (id: string) => {
        return (async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_DELETING_PLAYER });

            await Delete(`player/${id}`)

            dispatch(ActionCreators.getAllPlayers());
            dispatch({ type: Actions.FINISHED_DELETING_PLAYER })
        })
    },
    fetchBoardMessages: (page: number = 0) => {
        return (async (dispatch: (action: IAction) => void) => {
            dispatch({ type: Actions.STARTED_FETCHING_BOARD });

            var board = await Get<BoardMessage[]>(`board?p=${page}`).catch((e) => {
                dispatch({ type: Actions.FAILED_FETCHING_BOARD, payload: e })
                return;
            });;

            dispatch({ type: Actions.FINISHED_FETCHING_BOARD, payload: board });
        })
    },
    saveBoardMessage: (m: BoardMessage) => {
        return (async (dispatch: (action: IAction) => void, getState: () => IApplicationState) => {
            dispatch({ type: Actions.STARTED_SAVING_BOARD_MESSAGE });

            Post<BoardMessage>('board', m).catch((e) => { //optimistic... ignore await
                dispatch({ type: Actions.FAILED_SAVING_BOARD_MESSAGE, payload: e })
                return;
            });

            m.createdOn = new Date();
            m.from = getState().ownPlayer;

            dispatch({ type: Actions.FINISHED_SAVING_BOARD_MESSAGE, payload: m });
        })
    },
    fetchMessages: () => {
        return (async (dispatch: any) => {
            dispatch({ type: Actions.FETCHING_MESSAGES });
            var messages = await Get('messages').catch(() => {
                dispatch({ type: Actions.FETCHED_MESSAGES });
                return;
            });
            dispatch({ type: Actions.FETCHED_MESSAGES, payload: messages });
        });
    },
    fetchOnlineUsers: () => {
        return (async (dispatch: any) => {
            var users = await Get('onlineusers');
            dispatch({ type: Actions.FETCHED_ONLINEUSERS, users });
        });
    },
    sendMessge: (message: string) => {
        return (dispatch: any) => {
            SocketHandler.sendMessage(message);
        }
    },
    startedTypingMessage: () => {
        return (dispatch: any) => {
            SocketHandler.startedWriting();
        }
    },
    stopedTypingMessage: () => {
        return (dispatch: any) => {
            SocketHandler.stoppedWriting();
        }
    },
    savePlayer: (player: Player) => {
        return async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_SAVING_PLAYER })
            var id = await Post('player', player);

            dispatch({ type: Actions.FINISHED_SAVING_PLAYER, payload: player })
            dispatch(ActionCreators.getOwnPlayer())
            dispatch(ActionCreators.getAllPlayers())
        }
    },
    getOwnPlayer: () => {
        return async (dispatch: any, getState: () => IApplicationState) => {
            dispatch({ type: Actions.STARTED_FETCHING_PLAYERS })
            var player = await Get('ownplayer').catch(() => {
                dispatch({ type: Actions.FAILED_FETCHING_OWN_PLAYER });
                return;
            });
            dispatch({
                type: Actions.FINISHED_FETCHING_OWN_PLAYER, payload: player || {
                    ownerid: getState().currentUser.id
                } as Player
            })
        }
    },
    getAPlayer: (id: string) => {
        return async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_FETCHING_PLAYERS })
            var player = await Get('player/' + id).catch(() => {
                dispatch({ type: Actions.FAILED_FETCHING_SINGLE_PLAYER, payload: `Player ${id} not found` });
                return;
            });
            dispatch({ type: Actions.FINISHED_FETCHING_SINGLE_PLAYER, payload: player })
        }
    },
    getAllPlayers: () => {
        return async (dispatch: any) => {
            dispatch({ type: Actions.STARTED_FETCHING_PLAYERS })
            var players = await Get('players');
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
            var user = await Get('user').catch(e => { dispatch({ type: Actions.FAILED_FETCHING_CURR_USER }) });
            dispatch({ type: Actions.FINISHED_FETCHING_CURR_USER, payload: user })
        }
    }
}

export interface IAction {
    type: string,
    payload?: any
}

export interface IApplicationState {
    isDeleting: boolean,
    currentUser: User,
    ownPlayer: Player,
    allPlayers: Player[],
    isLoadingUser: boolean,
    isFetchingPlayers: boolean,
    isSavingPlayer: boolean,
    error: string,
    messages: Message[],
    isFetchingMessages: boolean,
    onlineusers: string[],
    boardMessages: BoardMessage[],
    isSavingBoardMessage: boolean,
    isFetchingBoard: boolean,
    playerWasSaved: boolean
}

const initalState: IApplicationState = {
    isDeleting: false,
    ownPlayer: null,
    allPlayers: [],
    currentUser: null,
    isLoadingUser: false,
    isSavingPlayer: false,
    isFetchingPlayers: false,
    error: null,
    messages: [],
    isFetchingMessages: false,
    onlineusers: [],
    boardMessages: [],
    isSavingBoardMessage: false,
    isFetchingBoard: false,
    playerWasSaved: false
}

export const reducer: Reducer<IApplicationState> = (state: IApplicationState, action: IAction) => {

    switch (action.type) {
        case Actions.STARTED_DELETING_PLAYER: return { ...state, isDeleting: true }
        case Actions.FINISHED_DELETING_PLAYER: return { ...state, isDeleting: false }
        case Actions.STARTED_FETCHING_BOARD: return { ...state, isFetchingBoard: true }
        case Actions.FAILED_FETCHING_BOARD: return { ...state, isFetchingBoard: false, error: action.payload }
        case Actions.FETCHING_MESSAGES: return { ...state, isFetchingMessages: true }
        case Actions.FINISHED_FETCHING_BOARD: return { ...state, isFetchingBoard: false, boardMessages: action.payload }
        case Actions.STARTED_SAVING_BOARD_MESSAGE: return { ...state, isSavingBoardMessage: true }
        case Actions.FINISHED_SAVING_BOARD_MESSAGE: return { ...state, isSavingBoardMessage: false, boardMessages: [action.payload, ...state.boardMessages,] }
        case Actions.FAILED_SAVING_BOARD_MESSAGE: return { ...state, isSavingBoardMessage: false, error: action.payload }
        case Actions.FETCHED_MESSAGES:
            var newstate = { ...state, isFetchingMessages: false }
            if (action.payload)
                newstate.messages = action.payload
            return newstate
        case Actions.FETCHED_ONLINEUSERS:
            var newstate = { ...state }
            if (action.payload)
                newstate.onlineusers = action.payload
            return newstate;
        case ChatActions.MESSAGE_WAS_RECIEVED: return { ...state, messages: [...state.messages, action.payload] }
        case ChatActions.SOMEONE_WENT_ONLINE: return { ...state, onlineusers: [...state.onlineusers, action.payload] }
        case ChatActions.SOMEOME_WENT_OFFLINE: return { ...state, onlineusers: en.from(state.onlineusers).where(x => x !== action.payload).toArray() }
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
        case Actions.FAILED_FETCHING_OWN_PLAYER: return { ...state, isFetchingPlayers: false, error: action.payload }
        case Actions.FINISHED_FETCHING_ALL_PLAYERS: return { ...state, isFetchingPlayers: false, allPlayers: action.payload }
        case Actions.FINISHED_FETCHING_OWN_PLAYER: return { ...state, isFetchingPlayers: false, ownPlayer: action.payload }

        case Actions.FINISHED_FETCHING_SINGLE_PLAYER: return { ...state, isFetchingPlayers: false, selectedPlayer: action.payload }
        case Actions.FAILED_FETCHING_SINGLE_PLAYER: return { ...state, isFetchingPlayers: false, error: action.payload }

        case Actions.STARTED_SAVING_PLAYER: return { ...state, isSavingPlayer: true, playerWasSaved: false }
        case Actions.FINISHED_SAVING_PLAYER: return { ...state, isSavingPlayer: false, playerWasSaved: true, allPlayers: state.allPlayers.map((p, i) => { return p._id === action.payload.id ? action.payload : p }) }
        default: return initalState
    }
};
