import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {ComplexityService} from "../../../../services/complexityService";

@Component({
    templateUrl: 'complexityUpdate.component.html'
})

export class ComplexityUpdate implements OnInit {
    model: any = {};
    loading = false;
    private sub :any;
    id: number;

    constructor(
        private router: Router,
        private complexityService: ComplexityService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        this.complexityService.getById(this.id).subscribe(
            data => {
                this.model = data;
            },

            error => {
                this.alertService.error("Problem with loading the complexity");
            }
        )
    }

    update() {
        this.loading = true;

        this.complexityService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
                    this.router.navigate(['/complexity/list']);
                },
                error => {
                    this.loading = false;
                    this.alertService.error(error);
                });
    }
}
