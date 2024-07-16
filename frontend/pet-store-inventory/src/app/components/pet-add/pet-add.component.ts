import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../../models/pet';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pet-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pet-add.component.html',
  styleUrl: './pet-add.component.css'
})
export class PetAddComponent {

  constructor(private router: Router) { }

  newPet: Pet = {
    id: '',
    naam: '',
    diersoort: '',
    leeftijd: 0,
    prijs: 0,
    geslacht: '',
    beschrijving: ''
  };

  editing: boolean = false;

  addNewPet() {
    this.newPet.id = uuidv4();
    this.savePetToLocalStorage(this.newPet);
    this.router.navigateByUrl('/pets');
  }

  cancel() {
    this.router.navigateByUrl('/pets');
  }

  savePetToLocalStorage(pet: Pet) {
    let pets = JSON.parse(localStorage.getItem('pets') || '[]');
    pets.unshift(pet);
    localStorage.setItem('pets', JSON.stringify(pets));
  }
}
