import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-inputs',
  templateUrl: './text-inputs.component.html',
})
export class TextInputsComponent {
  @Input() public inputFormArray: any;

  static createFormArray(formBuilder: FormBuilder, data: string[] = []) {
    const formArray: FormArray = formBuilder.array(
      data
        ? data.map((s) => TextInputsComponent.createFormGroup(formBuilder, s))
        : []
    );
    if (formArray.length < 1) {
      TextInputsComponent.addEmptyRow(formBuilder, formArray);
    }
    return formArray;
  }

  private static createFormGroup(
    formBuilder: FormBuilder,
    value: string = ''
  ): FormGroup {
    return formBuilder.group({
      value: value,
    });
  }

  static save(data: any) {
    debugger;
    return data.filter((d: any) => d.value).map((d: any) => d.value);
  }

  static addEmptyRow(formBuilder: FormBuilder, array: FormArray) {
    const emptyRow = TextInputsComponent.createFormGroup(formBuilder);
    array.push(emptyRow);
  }
}
