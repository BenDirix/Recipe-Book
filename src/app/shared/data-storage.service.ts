import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService,
    private authService: AuthService) {

  }

  saveRecipe() {
    return this.http.put(environment.firebaseLink + "recipes.json", this.recipeService.getRecipes());
  }

  loadRecipes() {
    return this.http.get<Recipe[]>(environment.firebaseLink + 'recipes.json').pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          }
        })
      }),
      tap(recipes => {
        this.recipeService.updateRecipes(recipes);
      })
    );
  }
}
