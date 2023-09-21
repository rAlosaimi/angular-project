import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe-list/recipr.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       const recipes = this.recipeService.getRecipes();
       if(recipes.length === 0){
        return this.recipeService.fetchRecipe();
       }else{
        return recipes;
       }
    }
}

/***************************************/
// This Resolver will run before loading the router
/***************************************/