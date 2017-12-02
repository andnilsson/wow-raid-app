export async function Post<T>(path: string, obj: T): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        var data = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                resolve();
            }
        });

        xhr.open("POST", `/api/${path}`);
        xhr.setRequestHeader("accept", "application/json");
        xhr.setRequestHeader("content-type", "application/json");

        xhr.send(data);
    })
}

export async function Get<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status == 200)
                    resolve(JSON.parse(this.responseText))
                else
                    reject();
            }
        });

        xhr.open("GET", `/api/${path}`);
        xhr.setRequestHeader("accept", "application/json");

        xhr.send();
    })
}