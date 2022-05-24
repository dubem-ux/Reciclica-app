import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class LoginPageForm{

  dataSection={};
  constructor(private formBuilder: FormBuilder){}

  createForm(): FormGroup{
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [Number, [Validators.required]]
    });
  }
}
