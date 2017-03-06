export class Complexity {
    id : number;
    type : String;
    description : String;

    constructor(id ?: number, type ?: String, description ?: String){
        this.id = id;
        this.type = type;
        this.description = description;
    }
}