import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {BonusService} from "../../../../services/bonusService";
import {BonusType} from "../../../../model/bonusType";
import {Bonus} from "../../../../model/bonus";
import {BonusTypeService} from "../../../../services/bonusTypeService";

@Component({
    templateUrl: 'bonusCreate.component.html'
})

export class BonusCreate implements OnInit {
    model: Bonus = new Bonus();
    loading = false;

    bonusTypes: BonusType[] = [];

    constructor(
        private router: Router,
        private bonusService: BonusService,
        private bonusTypeService: BonusTypeService,
        private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllBonusTypes();
    }

    create() {
        this.loading = true;

        this.bonusService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['/bonus/list']);
                },
                error => {
                    this.loading = false;
                    this.alertService.error(error);
                });
    }

    private loadAllBonusTypes() {
        this.bonusTypeService.getAll().subscribe(bonusTypes => { this.bonusTypes = bonusTypes; });
    }
}
