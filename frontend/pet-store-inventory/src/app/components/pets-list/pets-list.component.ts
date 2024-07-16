import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pet } from '../../models/pet';
import { PetsChartComponent } from '../pets-chart/pets-chart.component';
import { PetService } from '../../services/pet.service';



@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [RouterLink, CommonModule, PetsChartComponent],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.css'
})
export class PetsListComponent implements OnInit {

  pets: Pet[] = [];

  constructor(private router: Router, private petService: PetService) { }

  ngOnInit() {
    this.petService.getPets();
    this.loadPets();
  }

  loadPets() {
    const dPets = localStorage.getItem('pets');
    if (dPets) {
      this.pets = JSON.parse(dPets);
    }
  }

  updateLocalStorage() {
    localStorage.setItem('pets', JSON.stringify(this.pets));
  }

  editPet(pet: Pet) {
    this.router.navigateByUrl(`pets/edit/${pet.id}`);
  }

  deletePet(pet: Pet) {
    const index = this.pets.findIndex(a => a.id === pet.id);
    this.pets.splice(index, 1);
    this.updateLocalStorage();
  }

  chartPet() {
    this.router.navigateByUrl(`pets/chart`);
  }
}
