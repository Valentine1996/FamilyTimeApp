export class BonusType {
    id : number;
    shortName : String;
    description : String;
    iconName : String;

    constructor(id ?: number, shortName ?: String, description ?: String, iconName ?:String){
        this.id = id;
        this.shortName = shortName;
        this.description = description;
        this.iconName = iconName;
    }
}