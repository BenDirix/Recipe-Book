import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
// import { RecipesModule } from './recipes/recipes.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { AuthModule } from './auth/auth.module';


import { HeaderComponent } from './header/header.component'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // RecipesModule,
    // ShoppingListModule,
    SharedModule,
    CoreModule,
    // AuthModule
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
