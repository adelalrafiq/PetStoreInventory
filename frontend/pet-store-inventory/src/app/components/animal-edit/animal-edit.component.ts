import { Component, OnInit } from '@angular/core';
import { Animal } from '../../models/animal';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animal-edit',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './animal-edit.component.html',
  styleUrl: './animal-edit.component.css'
})
export class AnimalEditComponent implements OnInit {
  animal?: Animal | undefined;


  constructor(private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {   
    this.loadAnimal(); 
  }

  loadAnimal() {
    const animalId = this.route.snapshot.paramMap.get('id');
    if (animalId) {
      const storedAnimals = localStorage.getItem('animals');
      if (storedAnimals) {
        const animals: Animal[] = JSON.parse(storedAnimals);
        this.animal = animals.find(a => a.id === animalId);        
      }
    }
  }

  updateAnimal() {
    if (this.animal) {
      const storedAnimals = localStorage.getItem('animals');
      if (storedAnimals) {
        const animals = JSON.parse(storedAnimals);
        const index = animals.findIndex((a: Animal) => a.id === this.animal?.id);
        if (index !== -1) {
          animals[index] = this.animal;
          localStorage.setItem('animals', JSON.stringify(animals));
        }
      }

      // Navigate back to the animal list page
      this.router.navigateByUrl('/animals');
    }
  }

  cancel(){
    this.router.navigateByUrl('/animals');
  }
}
