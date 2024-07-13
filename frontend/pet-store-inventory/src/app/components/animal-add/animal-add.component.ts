import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from '../../models/animal';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-animal-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './animal-add.component.html',
  styleUrl: './animal-add.component.css'
})
export class AnimalAddComponent {

  constructor(private router: Router) { }

  newAnimal: Animal = {
    id: '',
    naam: '',
    diersoort: '',
    leeftijd: 0,
    prijs: 0,
    geslacht: '',
    beschrijving: ''
  };

  editing: boolean = false;

  addNewAnimal() {
    this.newAnimal.id = uuidv4();
    this.saveAnimalToLocalStorage(this.newAnimal);
    this.router.navigateByUrl('/animals');
  }

  cancel() {
    this.router.navigateByUrl('/animals');
  }

  saveAnimalToLocalStorage(animal: Animal) {
    let animals = JSON.parse(localStorage.getItem('animals') || '[]');
    animals.unshift(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
  }
}
