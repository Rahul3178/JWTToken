import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userList: any[] = [];

  constructor(private userService: UserService) {
      console.log("dashboard component ");
      
   }

  ngOnInit(): void {
    this.userService.getAllTheUsers().subscribe((res: any) => {
      this.userList=res.data;
      console.log(res.data);
      
    })
  
}
}
