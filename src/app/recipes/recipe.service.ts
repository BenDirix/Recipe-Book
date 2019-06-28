import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  constructor(private shoppingListService: ShoppingListService, private http: HttpClient) {
  }

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Tasy Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     '../../assets/schnitzel-germany.jpg',
  //     [
  //       new Ingredient('Meat', 2),
  //       new Ingredient('Cheese', 1),
  //       new Ingredient('Fries', 19)
  //     ]),
  //   new Recipe(
  //     'Big Fat Burger',
  //     'Need we say more?',
  //     '../../assets/king-burger-541x633.png',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 3),
  //       new Ingredient('Cheese', 3),
  //       new Ingredient('Tomatoe', 1),
  //       new Ingredient('Salad', 2),
  //     ])
  // ];
  private recipes: Recipe[] = [];
  getRecipes() {
    return this.recipes.slice(); // returns new array that is a copy of recipes
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
