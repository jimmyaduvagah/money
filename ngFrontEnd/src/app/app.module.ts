import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AuthToken } from './services/authToken';
import { HttpSettingsService } from './services/httpServiceSettings';
import { SettingsService } from './services/SettingsService';
import { SessionService } from './services/SessionService';
import { AccountsComponent } from './accounts/accounts.component';
import { ProfileComponent } from './profile/profile.component';
import { BaseService } from './services/base_service';
import { AccountService } from './accounts/accounts.service';
import { HomeComponent } from './home/home.component';
import { Profile2Component } from './profile2/profile2.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthTokenInterceptor } from './services/auth_interceptor';
import { ProfileService } from './profile2/profile.service';
import { UnauthorizedInterceptor } from './services/unauthorized.interceptor';
// import { appInitializer } from './services/app.initializer';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccountsComponent,
    ProfileComponent,
    HomeComponent,
    AccountSettingsComponent,
    Profile2Component,
    Profile2Component,
    AccountSettingsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    // { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    AuthToken, AuthService, HttpSettingsService, ProfileService, 
    SessionService, SettingsService, BaseService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
