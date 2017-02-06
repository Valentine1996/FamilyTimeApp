import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {AlertService} from "../../../../services/alert.service";

@Component({
    templateUrl: 'bonusTypeCreate.component.html'
})

export class BonusTypeCreate implements OnInit{
    model: any = {};

    constructor(
        private router: Router,
        private bonusTypeService: BonusTypeService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {

    }

    create() {
        this.model.iconName = "Mock"
        this.bonusTypeService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['/bonusType/list']);
                },
                error => {
                    this.alertService.error(error);
                });
    }
}
