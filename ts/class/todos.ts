import {Task} from "./task.js";


class Todos {
    tasks: Array<Task> = [];
    #backend_url = '';

    constructor(url) {
        this.#backend_url = url;
    }
    getTasks = async () => {
        return new Promise(async(resolve, reject) => {
            fetch(this.#backend_url)
                .then(response => response.json())
                .then((response) => {
                    this.#readJson(response);
                    resolve(this.tasks);
                }, (error) => {
                    reject(error);
                })
        })
    }
    addTask = async (text: string) => {
        return new Promise(async(resolve, reject) => {
            const json = JSON.stringify({description: text});
            fetch(this.#backend_url + '/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
                .then(response => response.json())
                .then((response) => {
                    resolve(this.#addToArray(response.id, text));
                }), (error) => {
                reject(error);
            }
        })
    }
    #readJson(tasksAsJson: any):void {
        tasksAsJson.forEach((node) => {
            const task = new Task(node.id, node.description);
            this.tasks.push(task);
        });
    }
    #addToArray(id: number, text:string){
        const task = new Task(id, text);
        this.tasks.push(task);
        return task;
    }
}
export {Todos};