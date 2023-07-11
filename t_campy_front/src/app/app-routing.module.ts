import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Views/home/home.component';
import { ForumComponent } from './Views/forum/forum.component';
import { TopicComponent } from './Views/topic/topic.component';
import { AdminComponent } from './Views/admin/admin.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { ErrorComponent } from './Views/error/error.component';
import { ComplaintComponent } from './Views/complaint/complaint.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'forums', component: ForumComponent },
  { path: 'forums/:id', component: TopicComponent },
  { path: 'complaint/:id', component: ComplaintComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
