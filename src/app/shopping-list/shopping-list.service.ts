import { Subject } from "rxjs";
import { Ingrediant } from "../shared/Ingrediant.model";

export class ShoppingListService{
  startEditing = new Subject<number>();

    private ingrediants: Ingrediant[] = [
        new Ingrediant("Apples", 5),
        new Ingrediant('Tomatos', 10)
      ];

      getIngrediants(){
        //return this.ingrediants.slice();
        return this.ingrediants;
      }

      getIngrediant(index: number){
          return this.ingrediants[index];
      }

      addIngrediant(ingrediant: Ingrediant){
        this.ingrediants.push(ingrediant);
      }

      addIngrediants(_ingrediants: Ingrediant[]){
       /*  for(let ingrediant of ingrediants){
            this.addIngrediant(ingrediant);
        } */
        this.ingrediants.push(..._ingrediants);
      }

      updateIngrediant(index: number, newIngrediant: Ingrediant){
        this.ingrediants[index] = newIngrediant;
      }

      deleteIngrediant(index: number){
        this.ingrediants.splice(index, 1);
      }
}