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
function GetUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var data = null;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.status != 200) {
                        reject(this.statusText);
                    }
                    var user = JSON.parse(this.responseText);
                    setTimeout(() => {
                        resolve(user);
                    }, 1000);
                }
            });
            xhr.open("GET", "/api/user");
            xhr.setRequestHeader("accept", "application/json");
            xhr.send(data);
        });
    });
}
exports.GetUser = GetUser;
function GetPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.responseText !== "")
                        resolve(JSON.parse(this.responseText));
                    else
                        resolve();
                }
            });
            xhr.open("GET", "/api/players");
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send();
        });
    });
}
exports.GetPlayers = GetPlayers;
function GetOwnPlayer() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (this.responseText !== "")
                        resolve(JSON.parse(this.responseText));
                    else
                        resolve();
                }
            });
            xhr.open("GET", "/api/player");
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send();
        });
    });
}
exports.GetOwnPlayer = GetOwnPlayer;
function SavePlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify(player);
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    resolve();
                }
            });
            xhr.open("POST", "/api/player");
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.send(data);
        });
    });
}
exports.SavePlayer = SavePlayer;
//# sourceMappingURL=service.js.map