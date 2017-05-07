import { Component, OnInit } from '@angular/core';
import {BonusService} from "../../../../services/bonusService";
import {Bonus} from "../../../../model/bonus";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    selector: 'bonus-list',
    templateUrl: 'bonusList.component.html',
    styleUrls: ['bonusList.component.css','/../../../../style/common/table/table.css']
})

export class BonusList implements OnInit {

    bonuses: Bonus[] = [];

    constructor(private bonusService: BonusService,
                private loaderService : LoaderService) {

    }

    ngOnInit() {
        this.loaderService.displayLoader(true);
        this.loadAllBonuses();
        this.loaderService.displayLoader(false);
    }

    deleteBonus(id: number) {
        this.bonusService.delete(id).subscribe(() => { this.loadAllBonuses() });
    }

    private loadAllBonuses() {
        this.bonusService.getAll().subscribe(bonuses => { this.bonuses = bonuses; });
    }
}