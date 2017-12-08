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

export async function Delete(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status == 401 || this.status == 404) {
                    reject();
                    return;
                }

                resolve();
            }
        });

        xhr.open("DELETE", `/api/${path}`);
        xhr.setRequestHeader("accept", "application/json");

        xhr.send();
    });
}

export async function Get<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status == 401) {
                    reject();
                    return;
                }
                if (this.status == 200) {
                    try {
                        if (this.responseText)
                            resolve(JSON.parse(this.responseText))
                        else
                            resolve();
                    } catch (e) {
                        console.log(e);
                        console.log(path);
                        reject(e);
                    }
                }
                else
                    reject();
            }
        });

        xhr.open("GET", `/api/${path}`);
        xhr.setRequestHeader("accept", "application/json");

        xhr.send();
    })
}