import User from "./domain/user";
import { Player } from "./domain/player";

export async function GetUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        var data = null;

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status != 200) {
                    reject(this.statusText)
                }
                var user = JSON.parse(this.responseText);
                setTimeout(() => {
                    resolve(user);
                }, 1000)
            }
        });

        xhr.open("GET", "/api/user");
        xhr.setRequestHeader("accept", "application/json");

        xhr.send(data);
    })
}

export async function GetPlayers(): Promise<Player[]> {
    return new Promise<Player[]>((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.responseText !== "")
                    resolve(JSON.parse(this.responseText))
                else
                    resolve();
            }
        });

        xhr.open("GET", "/api/players");
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send();
    });
}

export async function GetOwnPlayer(): Promise<Player> {
    return new Promise<Player>((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.responseText !== "")
                    resolve(JSON.parse(this.responseText))
                else
                    resolve();
            }
        });

        xhr.open("GET", "/api/player");
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send();
    });
}

export async function SavePlayer(player: Player): Promise<void> {
    return new Promise<void>((resolve, reject) => {
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
    })
}