"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("../service");
const init_1 = require("../chat/init");
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
};
exports.ActionCreators = {
    sendMessge: (message) => {
        return (dispatch) => {
            init_1.SocketHandler.sendMessage(message);
        };
    },
    startedTypingMessage: () => {
        return (dispatch) => {
            init_1.SocketHandler.startedWriting();
        };
    },
    stopedTypingMessage: () => {
        return (dispatch) => {
            init_1.SocketHandler.stoppedWriting();
        };
    },
    savePlayer: (player) => {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: Actions.STARTED_SAVING_PLAYER });
            var id = yield service_1.SavePlayer(player);
            dispatch({ type: Actions.FINISHED_SAVING_PLAYER, payload: id });
            dispatch(exports.ActionCreators.getOwnPlayer());
        });
    },
    getOwnPlayer: () => {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: Actions.STARTED_FETCHING_PLAYERS });
            var player = yield service_1.GetOwnPlayer();
            dispatch({ type: Actions.FINISHED_FETCHING_CURR_PLAYER, payload: player });
        });
    },
    getAllPlayers: () => {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: Actions.STARTED_FETCHING_PLAYERS });
            var players = yield service_1.GetPlayers();
            dispatch({ type: Actions.FINISHED_FETCHING_ALL_PLAYERS, payload: players });
        });
    },
    authenticate: () => {
        return (dispatch) => {
            dispatch({ type: Actions.STARTED_AUTHENTICATION });
            window.location.href = '/auth/bnet';
        };
    },
    fetchCurrentUser: () => {
        return (dispatch) => __awaiter(this, void 0, void 0, function* () {
            dispatch({ type: Actions.STARTED_FETCHING_CURR_USER });
            var user = yield service_1.GetUser().catch(e => { dispatch({ type: Actions.FAILED_FETCHING_CURR_USER }); });
            dispatch({ type: Actions.FINISHED_FETCHING_CURR_USER, payload: user });
        });
    }
};
const initalState = {
    currentPlayer: null,
    allPlayers: [],
    currentUser: null,
    isLoadingUser: false,
    isSavingPlayer: false,
    isFetchingPlayers: false,
    error: null,
    messages: []
};
exports.reducer = (state, action) => {
    switch (action.type) {
        case init_1.ChatActions.MESSAGE_WAS_RECIEVED: return Object.assign({}, state, { messages: [...state.messages, action.payload] });
        case init_1.ChatActions.SOMEOME_WENT_OFFLINE: return Object.assign({}, state);
        case Actions.STARTED_AUTHENTICATION: return Object.assign({}, state, { isLoadingUser: true });
        case Actions.STARTED_FETCHING_CURR_USER: return Object.assign({}, state, { isLoadingUser: true });
        case Actions.FINISHED_FETCHING_CURR_USER: return Object.assign({}, state, { isLoadingUser: false, currentUser: action.payload });
        case Actions.FAILED_FETCHING_CURR_USER: return Object.assign({}, state, { isLoadingUser: false, currentUser: null });
        case Actions.STARTED_FETCHING_PLAYERS: return Object.assign({}, state, { isFetchingPlayers: true });
        case Actions.FAILED_FETCHING_ALL_PLAYERS:
        case Actions.FAILED_FETCHING_CURR_PLAYER: return Object.assign({}, state, { isFetchingPlayers: false, error: action.payload });
        case Actions.FINISHED_FETCHING_ALL_PLAYERS: return Object.assign({}, state, { isFetchingPlayers: false, allPlayers: action.payload });
        case Actions.FINISHED_FETCHING_CURR_PLAYER: return Object.assign({}, state, { isFetchingPlayers: false, currentPlayer: action.payload });
        case Actions.STARTED_SAVING_PLAYER: return Object.assign({}, state, { isSavingPlayer: true });
        case Actions.FINISHED_SAVING_PLAYER: return Object.assign({}, state, { isSavingPlayer: false });
        default: return initalState;
    }
};
//# sourceMappingURL=reducer.js.map