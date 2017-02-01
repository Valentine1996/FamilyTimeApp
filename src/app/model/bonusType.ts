export class BonusType {
    id : number;
    shortName : String;
    description : String;
    iconName : String;

    constructor(shortName : String, description : String, iconName :String){
        this.shortName = shortName;
        this.description = description;
        this.iconName = iconName;
    }
}