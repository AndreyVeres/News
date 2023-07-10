import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { IUser } from 'src/app/core/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  constructor(private profileService:ProfileService){}

  editForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  changeHandler(){
    this.profileService.applyUserChange(this.editForm.value as IUser)
  }

}
