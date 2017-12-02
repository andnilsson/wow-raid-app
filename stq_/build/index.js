"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const main_1 = require("./main");
const reducer_1 = require("./store/reducer");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const redux_thunk_1 = require("redux-thunk");
const react_router_dom_1 = require("react-router-dom");
const init_1 = require("./chat/init");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
// var store = createStore(reducer, applyMiddleware(thunk, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
var store = redux_1.createStore(reducer_1.reducer, composeEnhancers(redux_1.applyMiddleware(redux_thunk_1.default)));
init_1.SocketHandler.subscribetoSocket(store.dispatch);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(main_1.default, null))), document.getElementById("content"));
//# sourceMappingURL=index.js.map