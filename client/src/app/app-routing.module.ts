import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { BodyComponent } from './components/body/body.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { GoalsComponent } from './components/goals/goals.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
  {
    path: 'signin',
    component: SigninComponent,
    children: [{ path: '', component: SigninComponent }],
  },
  { path: 'transactions', component: BodyComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
