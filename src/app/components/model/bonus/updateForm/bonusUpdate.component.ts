import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {AlertService} from "../../../../services/alert.service";
import {Bonus} from "../../../../model/bonus";
import {BonusService} from "../../../../services/bonusService";
import {BonusType} from "../../../../model/bonusType";

@Component({
    templateUrl: 'bonusUpdate.component.html'
})

export class BonusUpdate implements OnInit {
    model: any = {};
    private sub :any;
    id: number;
    loading = false;

    bonusTypes: BonusType[] = [];

    constructor(
        private router: Router,
        private bonusService: BonusService,
        private bonusTypeService: BonusTypeService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.loadAllBonusTypes();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        this.bonusService.getById(this.id).subscribe(
            data => {
                this.model.title = data.title;
                this.model.description = data.description;
                this.model.id = data.id;
                this.model.price = data.price;

                this.model.bonusTypeId = data.bonusType.id;//set current bonus type
            },

            error => {
                this.alertService.error("Problem with loading the bonusType");
            }
        )
    }

    update() {
        this.loading = true;

        this.bonusService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
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
