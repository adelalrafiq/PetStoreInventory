import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from '../../models/animal';
import { v4 as uuidv4 } from 'uuid';
import {  FormsModule } from '@angular/forms';

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
    aantalInVoorraad: 0,
    beschrijving: ''
  };

  addAnimal() {     
    // Generate a new UUID for the animal
    this.newAnimal.id = uuidv4();

    // Save the new animal to localStorage
    this.saveAnimalToLocalStorage(this.newAnimal);
    
    // Reset the form fields
    this.newAnimal = {
      id: '', // Reset ID
      naam: '',
      diersoort: '',
      leeftijd: 0,
      prijs: 0,
      geslacht: '',
      aantalInVoorraad: 0,
      beschrijving: ''
    };

    // Navigate to the list page
    this.router.navigateByUrl('/animals');
  }

  saveAnimalToLocalStorage(animal: Animal) {
    let animals = JSON.parse(localStorage.getItem('animals') || '[]');
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
  }
}



