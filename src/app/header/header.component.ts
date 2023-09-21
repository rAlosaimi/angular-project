import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthanticated = false;
  private userSub!: Subscription;

  constructor(private recipesService: RecipeService, private authService: AuthService){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthanticated = !user? false : true;
      
    })
  }
  
  ngOnDestroy(): void {
   this.authService.user.unsubscribe();
  }

  onSaveData(){
    this.recipesService.storeRecipe();
  }

  onFetchData(){
    this.userSub =  this.recipesService.fetchRecipe().subscribe();
  }

  onLogout(){
    this.authService.logout();
    
  }
}
