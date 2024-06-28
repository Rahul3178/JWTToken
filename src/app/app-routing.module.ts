import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {path:'' , redirectTo:'login' ,pathMatch:'full'},
  {path:'login' ,component:LoginComponent},
  {
    path:'' , component:LayoutComponent,
    children:[
      {
        path:'dashboard', component:DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
