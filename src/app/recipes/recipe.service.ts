import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe-list/recipr.model';
import { Ingrediant } from '../shared/Ingrediant.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(
    private SLService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addIngrediantToSL(ingrediant: Ingrediant[]) {
    this.SLService.addIngrediants(ingrediant);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  /*  setRecipe(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      } */

  // Http request...
  storeRecipe() {
    this.authService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.put(
            'https://ng-course-recipe-book-64448-default-rtdb.firebaseio.com/recipes.json?auth=' +
              user?.toket,
            this.recipes
          );
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipe() {
    // the 1 inside a take will take only one value and then unsubscribe, it will give me the latest user.
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-64448-default-rtdb.firebaseio.com/recipes.json?auth=' +
            user?.toket
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingrediants: recipe.ingrediants ? recipe.ingrediants : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      })
    );
  }
}

/*  private recipes: Recipe[] = [
        new Recipe("A Test Recipe", "This is simply a test",
        "https://www.seriouseats.com/thmb/MHMlz7l-gpIzTYPuP8Mqy7k2-u4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg",
         [new Ingrediant('Meat', 1),
        new Ingrediant('Fries', 20)]),
        new Recipe("A Test Recipe 2 ", "This is simply a test",
        "https://www.seriouseats.com/thmb/MHMlz7l-gpIzTYPuP8Mqy7k2-u4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg", []),
        new Recipe("A Test Recipe 3", "This is simply a test",
        "https://www.seriouseats.com/thmb/MHMlz7l-gpIzTYPuP8Mqy7k2-u4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg", []),
        new Recipe("A Test Recipe", "This is simply a test",
        "https://www.seriouseats.com/thmb/MHMlz7l-gpIzTYPuP8Mqy7k2-u4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SEA-classic-panzanella-salad-recipe-hero-03-74d7b17dde8f498795387ef0c22d7215.jpg", []),
      ]; */
