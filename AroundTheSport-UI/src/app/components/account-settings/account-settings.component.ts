import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUser } from 'src/app/models/account/application-user-model';
import { ApplicationUserUpdate } from 'src/app/models/account/application-user-update.model';
import { AccountService } from 'src/app/services/account/account.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  public updateUserForm!: FormGroup;

  public profession: any = [] ;

  public username!: string;

  constructor(
      public accountService: AccountService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private componentRegister: RegisterComponent
    ){}

    ngOnInit(): void {

    this.profession = this.componentRegister.allProfessions;

    this.updateUserForm = this.formBuilder.group({
      fullname: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)

      ]],
      lastname: ['', [
        Validators.minLength(1),
        Validators.maxLength(30)
      ]],
      company: ['', [
        Validators.maxLength(30)
      ]],
      profession: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]]
    });

  }

  updateForm(updateUser: ApplicationUserUpdate){

    this.updateUserForm.patchValue({
      fullname: updateUser.fullname,
      lastname: updateUser.lastname,
      company: updateUser.company,
      profession: updateUser.profession
    });
  }

  formHasError(error: string){
    return !!this.updateUserForm.hasError(error);
  }

  isTouched(field: string){
    return this.updateUserForm.get(field)!.touched;
  }

  hasErrors(field: string) {
    return this.updateUserForm.get(field)!.errors;
  }

  hasError(field: string, error: string){
    return !!this.updateUserForm.get(field)!.hasError(error);
  }

  onSubmit(){
    let applicationUserUpdate: ApplicationUserUpdate = new ApplicationUserUpdate(
      this.updateUserForm.get('fullanme')!.value,
      this.updateUserForm.get('lastname')!.value,
      this.updateUserForm.get('company')!.value,
      this.updateUserForm.get('profession')!.value
    );


    this.accountService.update(applicationUserUpdate).subscribe((userUpdate) => {
      this.updateForm(userUpdate);
      this.toastr.info('Data seved.');;
    })
  }

}
  
