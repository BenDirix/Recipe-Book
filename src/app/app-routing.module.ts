import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";


import { HomeComponent } from './home/home.component';
// import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  // { path: "recipes", loadChildren: './recipes/recipes.module#RecipesModule' }
  {
    path: "recipes", loadChildren: () => import('./recipes/recipes.module')
      .then(m => m.RecipesModule)
  },
  {
    path: "shopping-list", loadChildren: () => import('./shopping-list/shopping-list.module')
      .then(m => m.ShoppingListModule)
  },
  { path: "auth", loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}