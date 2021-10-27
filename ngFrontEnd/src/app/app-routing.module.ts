import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { Profile2Component } from './profile2/profile2.component';

const routes: Routes = [
    {path: 'login', component: AuthComponent},
    {path: 'accounts', component: AccountsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'profile2', component: Profile2Component},
    {path: 'account/settings', component: AccountSettingsComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
