import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationUserCreate } from 'src/app/models/account/application-user-create.model';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  professions: string[] = ["Trainer", "Dietician", "Physiotherapist", "Gym owner", "Quest"]; 

  allProfessions: any = ['Trainer','Dietician','Physiotherapist','Gym owner','Quest'] ;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ){

  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname: [null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)

      ]],
      lastname: [null, [
        Validators.minLength(1),
        Validators.maxLength(30)
      ]],
      company: [null, [
        Validators.maxLength(30)
      ]],
      profession: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      email: [null, [
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
        Validators.maxLength(30)
      ]],
      username: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      confirmPassword: [null, [
        Validators.required
      ]]
    }, {
      validators: this.matchValue
    });
  }

  changeProfession(e: any){
    console.log(this.registerForm.value)
  }

  formHasError(error: string){
    return !!this.registerForm.hasError(error);
  }

  isTouched(field: string){
    return this.registerForm.get(field)!.touched;
  }

  hasErrors(field: string) {
    return this.registerForm.get(field)!.errors;
  }

  hasError(field: string, error: string){
    return !!this.registerForm.get(field)!.hasError(error);
  }

  matchValue: ValidatorFn = (fg: AbstractControl) => {
    const password = fg.get('password')!.value;
    const confirmPassword = fg.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { isMatching: true};
  }

  onSubmit(){
    let applicationUserCreate: ApplicationUserCreate = new ApplicationUserCreate(
      this.registerForm.get('username')!.value,
      this.registerForm.get('password')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm.get('profession')!.value,
      this.registerForm.get('fullname')!.value,
      this.registerForm.get('lastname')!.value,
      this.registerForm.get('company')!.value,
    );


    this.accountService.register(applicationUserCreate).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

}
