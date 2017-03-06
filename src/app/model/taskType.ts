export class TaskType {
    id : number;
    shortName : String;
    description : String;

    constructor(id ?: number, shortName ?: String, description ?: String){
        this.id = id;
        this.shortName = shortName;
        this.description = description;
    }
}