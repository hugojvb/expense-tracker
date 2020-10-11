import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    BodyComponent,
    SigninComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
