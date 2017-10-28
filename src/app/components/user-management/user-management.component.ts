
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  private userList:User[];  
  private respone;
  private status:string;
  private isEditable:boolean[]; 

  constructor(private userManagementService:UserManagementService) { }

  ngOnInit() {

    this.status = "superadmin";
    this.isEditable = [];
    this.getAllUser();

  }

  getAllUser(){
	    this.userManagementService.getAllUser().subscribe((response) => {
  	  this.userList = response;
  })
  
  }

  addUser(username,password,email){
    this.userManagementService.createNewUser(username,password,email,this.status).subscribe((response) => {
	  this.respone = response;
	  this.getAllUser();
  });
  }

  deleteUser(user){
	this.userList.forEach((element,index) => {
  	if(element == user){
    	this.userManagementService.deleteUser(user.adm_id).subscribe((response) => {
      	console.log("delete respone : "+response);
    	});
    	this.userList.splice(index,1);
  	}
	});
	return false;
  }

   editUser(id,username,password,email,status){
	this.userManagementService.editUser(id,username,password,email,status).subscribe((response) => {
  	this.getAllUser();
	});
  }

  toggleEdit(i){
	this.isEditable.forEach((element,index) => {
    	if(i == index){
      	this.isEditable[index] = !this.isEditable[index]
    	}else{
      	this.isEditable[index] = false;
    	}
	});
	console.log(this.isEditable);
  }




}

interface User {
  adm_id: string;
  username: string;
  email: string;
  password: string;
  status: string;
}
