import { Component, OnInit } from '@angular/core';
import {Complexity} from "../../../../model/complexity";
import {ComplexityService} from "../../../../services/complexityService";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    selector: 'complexity-list',
    templateUrl: 'complexityList.component.html',
    styleUrls: ['/../../../../style/common/table/table.css']
})

export class ComplexityList implements OnInit {

    complexities: Complexity[] = [];

    constructor(private complexityService: ComplexityService,
                private loaderService : LoaderService) {

    }

    ngOnInit() {
        this.loaderService.displayLoader(true);
        this.loadAllComplexities();
        this.loaderService.displayLoader(false);
    }

    deleteComplexity(id: number) {
        this.complexityService.delete(id).subscribe(() => { this.loadAllComplexities() });
    }

    private loadAllComplexities() {
        this.complexityService.getAll().subscribe(complexities => { this.complexities = complexities; });
    }
}