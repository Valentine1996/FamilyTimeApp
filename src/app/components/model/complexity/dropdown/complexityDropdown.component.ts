import {Component, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Complexity} from "../../../../model/complexity";

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR_COMPLEXITY: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ComplexityDropdown),
    multi: true
};

@Component({
    selector: 'complexity-dropdown',
    templateUrl: 'complexityDropdown.component.html',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR_COMPLEXITY]
})
export class ComplexityDropdown implements ControlValueAccessor {

    @Input('bonusTypes')
    complexities: Complexity[];

    //The internal data model
    private innerValue: String;

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

}