import {SoulMirror} from "./soul_mirror";

export class ToDo {
    constructor(public readonly date: Date,
                public readonly mirror: SoulMirror,


                public readonly title: string,
    ) {
    }
}