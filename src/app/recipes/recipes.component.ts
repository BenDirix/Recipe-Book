import { Component, OnInit } from '@angular/core';
//import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers: [RecipeService] // Removed so new recipes don't get deleted
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
