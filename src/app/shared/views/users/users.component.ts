import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  public users;
  public userForm;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { 
    this.userForm = this.formBuilder.group({
      name: '',
      age: ''
    });
  }

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers() {
    this.users = this.userService.users;
  }

  add(userForm) {
    console.log(userForm);
    this.userService.add(userForm);
    this.refreshUsers();
    this.userForm.reset();
  }

  delete({ id }) {
    this.userService.delete(id);
    this.refreshUsers();
  }

  edit(user, { innerText: age }) {
    const{ id } = user;
    this.userService.edit(id, { ...user, age });
    this.refreshUsers();
  }

  toggle({ id }) {
    this.userService.toggle(id);
    this.refreshUsers();
  }
}
