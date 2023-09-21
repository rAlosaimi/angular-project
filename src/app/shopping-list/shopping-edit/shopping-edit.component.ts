import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingrediant } from 'src/app/shared/Ingrediant.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slform!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editItemIndex!: number;
  editedItem!: Ingrediant;

  constructor(private slService: ShoppingListService){}
  

  ngOnInit() {
    this.subscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngrediant(index);
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addItem(form: NgForm){
    const value = form.value;
    const newIngrediant = new Ingrediant(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngrediant(this.editItemIndex, newIngrediant);
    }else{
      this.slService.addIngrediant(newIngrediant);
    }
    this.editMode = false;
    this.slform.reset();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngrediant(this.editItemIndex);
    this.onClear();
  }

 }
