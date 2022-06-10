/* eslint-disable arrow-body-style */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class RegisterPageForm{
  private form: FormGroup;
  private formBuilder: FormBuilder;
  constructor(formBuilder: FormBuilder ){
    this.formBuilder = formBuilder;
    this.form = this.createForm();

  }

  private createForm(): FormGroup{
    let form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: [''],
      phone: ['', [Validators.required]],
      address: this.formBuilder.group({
        street:['', [Validators.required]],
        numbr: ['', [Validators.required]],
        neighbourhood: ['', [Validators.required]],
        complement: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
        state: ['', [Validators.required]]
      })
    });
    form.get('repeatPassword').setValidators(this.matchPasswordAndRepeatPassword(form));
    return form;
  }

  getForm(): FormGroup{
    return this.form;
  }



  matchPasswordAndRepeatPassword(form: FormGroup): ValidatorFn{
    const password = form.get('password');
    const repeatpassword = form.get('repeatPassword');

    const validator = () => {
      return password.value === repeatpassword.value ? null : {isntMatching: true};
    };
    return validator;
  }


}




