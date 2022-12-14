// Imports Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Imports Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListWordsComponent } from './components/list-words/list-words.component';

// Imports FontAwesome


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ListWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
