import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {
  categories;
  

  constructor(private db: AngularFirestore) { 
  }
  getCategories(){
    return this.db.collection('/workout-categories').valueChanges()
  }
  addCategory(newCategory){
    let data = {name: newCategory}
    this.db.collection('/workout-categories').add(data)
  }
}
