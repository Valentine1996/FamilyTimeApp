import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {AlertService} from "../../../../services/alert.service";

@Component({
    templateUrl: 'bonusTypeUpdate.component.html'
})

export class BonusTypeUpdate implements OnInit {
    model: any = {};
    private sub :any;
    id: number;

    constructor(
        private router: Router,
        private bonusTypeService: BonusTypeService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        console.log(this.id)

        this.bonusTypeService.getById(this.id).subscribe(
            data => {
                this.model = data;
            },

            error => {
                this.alertService.error("Problem with loading the bonusType");
            }
        )
    }

    update() {

        this.bonusTypeService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
                    this.router.navigate(['/bonusType/list']);
                },
                error => {
                    this.alertService.error(error);
                });
    }
}
