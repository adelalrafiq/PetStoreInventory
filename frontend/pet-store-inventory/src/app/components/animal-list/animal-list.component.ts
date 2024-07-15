import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal';
import { AnimalChartComponent } from '../animal-chart/animal-chart.component';
import { AnimalService } from '../../services/animal.service';


@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [RouterLink, CommonModule, AnimalChartComponent],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.css'
})
export class AnimalListComponent implements OnInit {

  animals: Animal[] = [];

  constructor(private router: Router, private animalService: AnimalService) { }

  ngOnInit() {
    this.animalService.getAnimals();
    this.loadAnimals();
  }

  loadAnimals() {
    const storedAnimals = localStorage.getItem('animals');
    if (storedAnimals) {
      this.animals = JSON.parse(storedAnimals);
    }
  }

  updateLocalStorage() {
    localStorage.setItem('animals', JSON.stringify(this.animals));
  }

  editAnimal(animal: Animal) {
    this.router.navigateByUrl(`animals/edit/${animal.id}`);
  }

  deleteAnimal(animal: Animal) {
    const index = this.animals.findIndex(a => a.id === animal.id);
    this.animals.splice(index, 1);
    this.updateLocalStorage();
  }

  chartAnimal() {
    this.router.navigateByUrl(`animals/chart`);
  }
}
