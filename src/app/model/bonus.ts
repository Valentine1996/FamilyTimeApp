import {BonusType} from "./bonusType";

export class Bonus {
    id : number;
    bonusTypeId : number;
    title : String;
    description : String;
    price : number;


    constructor(id ?: number, bonusTypeId ?: number, title ?: String, description ?: String, price ?: number){
        this.bonusTypeId = bonusTypeId;
        this.title = title;
        this.description = description;
        this.price = price;
    }
}