import { Component, OnInit } from '@angular/core';
import {Complexity} from "../../../../model/complexity";
import {ComplexityService} from "../../../../services/complexityService";

@Component({
    selector: 'complexity-list',
    templateUrl: 'complexityList.component.html',
    styleUrls: ['/../../../../style/common/table/table.css']
})

export class ComplexityList implements OnInit {

    complexities: Complexity[] = [];

    constructor(private complexityService: ComplexityService) {

    }

    ngOnInit() {
        this.loadAllComplexities();
    }

    deleteComplexity(id: number) {
        this.complexityService.delete(id).subscribe(() => { this.loadAllComplexities() });
    }

    private loadAllComplexities() {
        this.complexityService.getAll().subscribe(complexities => { this.complexities = complexities; });
    }
}