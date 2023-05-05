import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationUserUpdate } from 'src/app/models/account/application-user-update.model';
import { AccountService } from 'src/app/services/account/account.service';
import { RegisterComponent } from '../register/register.component';
import { AvatarService } from 'src/app/services/avatar/avatar.service';
import { Avatar } from 'src/app/models/avatart/avatar.model';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { AvatarUpdate } from 'src/app/models/avatart/avatar.update';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  @ViewChild('avatarUploadElement') avatarUploadElement!: ElementRef;

  public updateUserForm!: FormGroup;

  public profession: any = [] ;

  public username!: string;

  public avatar!: Avatar;

  public avatarId!: number;

  public avatarImageUrl!: string;

  avatarFile: any;

  constructor(
      public  accountService: AccountService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private componentRegister: RegisterComponent,
      private router: Router,
      private avatarService: AvatarService
    ){}

    ngOnInit(): void {
    
    this.profession = this.componentRegister.allProfessions;

    this.avatarService.getAvatarByUserId().subscribe(userAvatar =>{
        if(!!userAvatar){
          this.avatarImageUrl = userAvatar.avatarUrl;
          this.avatarId = userAvatar.avatarId;
        }});

      this.updateUserForm = this.formBuilder.group({
      fullname: ["", [
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

    this.updateUserForm.setValue({
      fullname: this.accountService.currentUserValue.fullname,
      lastname: this.accountService.currentUserValue.lastname,
      company: this.accountService.currentUserValue.company,
      profession: this.accountService.currentUserValue.profession
    })

  }

  confirmDelete(avatar: Avatar){
    avatar.deleteConfirm = true;
  }

  cancelDeleteConfirm(avatar: Avatar){
    avatar.deleteConfirm = false;
  }

  deleteConfirmed(avatar: Avatar){
    this.avatarService.delete(avatar.avatarId).subscribe(() => {
      this.toastr.info("Avatar delete")
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatarFile = file;
    }
  }

  saveAvatar(){

    const formData = new FormData();
    formData.append('file', this.avatarFile);

    if(this.avatarImageUrl){
      this.avatarService.get(this.avatarId).subscribe(avatarUser =>
        this.avatarId = avatarUser.avatarId);
      console.log(this.avatarId);
      this.avatarService.delete(this.avatarId).subscribe();

      this.avatarService.create(formData).subscribe(createdAvatar => {
        this.toastr.info("New avatar uploaded");
        this.avatar = createdAvatar;
        window.location.reload();
      })
    }
    else{
      this.avatarService.create(formData).subscribe(createdAvatar => {
        this.toastr.info("Avatar uploaded");
        this.avatar = createdAvatar;
        window.location.reload();
      })
    }
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
      this.updateUserForm.get('fullname')!.value,
      this.updateUserForm.get('lastname')!.value,
      this.updateUserForm.get('company')!.value,
      this.updateUserForm.get('profession')!.value
    );

    this.accountService.update(applicationUserUpdate).subscribe((userUpdate) => {
      this.updateForm(userUpdate);
      this.toastr.info('Data saved.');
      window.location.reload();
    })
  }

}
  
