import { Ingrediant } from "src/app/shared/Ingrediant.model";

export class Recipe {
    public name: string;
    public description: string; 
    public imagePath: string;
    public ingrediants!: Ingrediant[];

    constructor(name: string, description: string , imagePath: string, ingrediants: Ingrediant[]){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingrediants = ingrediants;
    }
}