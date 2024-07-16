import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './pet-edit.component.html',
  styleUrl: './pet-edit.component.css'
})
export class PetEditComponent implements OnInit {
  pet?: Pet | undefined;


  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.loadPet();
  }

  loadPet() {
    const petId = this.route.snapshot.paramMap.get('id');
    if (petId) {
      const pets = localStorage.getItem('pets');
      if (pets) {
        const Pets: Pet[] = JSON.parse(pets);
        this.pet = Pets.find(a => a.id === petId);
      }
    }
  }

  updatePet() {
    if (this.pet) {
      const pets = localStorage.getItem('pets');
      if (pets) {
        const dPets = JSON.parse(pets);
        const index = dPets.findIndex((a: Pet) => a.id === this.pet?.id);
        if (index !== -1) {
          dPets[index] = this.pet;
          localStorage.setItem('pets', JSON.stringify(dPets));
        }
      }
      // Navigate back to the Pet list page
      this.router.navigateByUrl('/pets');
    }
  }

  cancel() {
    this.router.navigateByUrl('/pets');
  }
}
