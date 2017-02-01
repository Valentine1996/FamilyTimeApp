import {Component} from "@angular/core";
import {BonusType} from "../../../model/bonusType";

@Component({
    templateUrl: 'bonusType.component.html',
    styleUrls: ['bonusType.component.css']
})

export class BonusTypeComponent {
    bonusType : BonusType;
}