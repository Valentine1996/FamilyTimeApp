import { Component, OnInit } from '@angular/core';
import {BonusType} from "../../../../model/bonusType";
import {BonusTypeService} from "../../../../services/bonusTypeService";

@Component({
    selector: 'bonusType-list',
    templateUrl: 'bonusTypeList.component.html',
    styleUrls: ['bonusTypeList.component.css']
})

export class BonusTypeList implements OnInit {

    bonusTypes: BonusType[] = [];

    constructor(private bonusTypeService: BonusTypeService) {

    }

    ngOnInit() {
        this.loadAllBonusTypes();
        // this.bonusTypes = [new BonusType("test", "test", "test"),
        //                    new BonusType("test", "test", "test")]
    }

    deleteBonusType(id: number) {
        this.bonusTypeService.delete(id).subscribe(() => { this.loadAllBonusTypes() });
    }

    private loadAllBonusTypes() {
        this.bonusTypeService.getAll().subscribe(bonusTypes => { this.bonusTypes = bonusTypes; });
    }
}