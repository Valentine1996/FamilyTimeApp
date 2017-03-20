import {Component, forwardRef, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {TaskType} from "../../../../model/taskType";

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR_TASKTYPE: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TaskTypeDropdown),
    multi: true
};

@Component({
    selector: 'taskType-dropdown',
    templateUrl: 'taskTypeDropdown.component.html',
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR_TASKTYPE]
})
export class TaskTypeDropdown implements ControlValueAccessor {

    @Input('taskTypes')
    taskTypes: TaskType[] = [];

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