import { Player } from "./player";

export class BoardMessage {
    from: Player
    createdOn: Date
    text: string
    tags: Player[]
    _id: string
}