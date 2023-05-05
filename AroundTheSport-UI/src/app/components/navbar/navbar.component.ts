import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { AvatarService } from 'src/app/services/avatar/avatar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  isCollapsed = true;
  public avatarImageUrl!: string ;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private avatarService: AvatarService
  ){
    this.avatarService.getAvatarByUserId().subscribe(userAvatar =>{
    if(!!userAvatar){
      this.avatarImageUrl = userAvatar.avatarUrl;
    }});}

  logout(){
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}


