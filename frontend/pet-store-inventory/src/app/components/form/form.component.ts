import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PetService } from '../../services/pet.service';
import { PetDetails } from '../../models/petDetails';
import { v4 as uuidv4 } from 'uuid';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  petId: string | null = null;
  petData: PetDetails = new PetDetails();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public petService: PetService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('id');
    if (this.petId) {
      this.loadPetData(this.petId);
    } else {
      this.initializeFormData();
    }
  }

  loadPetData(id: string): void {
    this.petService.list$.pipe(
      switchMap(pets => pets.find(pet => pet.id === id)
        ? [pets.find(pet => pet.id === id) as PetDetails] : [])
    ).subscribe(pet => {
      if (pet) {
        this.petService.formData = { ...pet };
      }
    });
  }

  initializeFormData(): void {
    this.petService.formData = new PetDetails();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (!this.petService.formData.id) {
        this.petService.formData.id = uuidv4()
        this.insertRecord(form)
      } else {
        this.updateRecord(form);
      }
    }
  }

  insertRecord(form: NgForm): void {
    this.petService.addNewPet().subscribe({
      next: res => {
        this.petService.refreshList();
        this.petService.resetForm(form);
        this.toastr.success('Succesvol toegevoegd', 'Nieuw Pet')
        this.router.navigateByUrl('list');
      },
      error: err => {
        console.error('Error adding pet:', err);
        this.toastr.error('Fout bij toevoegen', 'Error');
      }
    });
  }

  updateRecord(form: NgForm): void {
    this.petService.updatePet().subscribe({
      next: res => {
        this.petService.refreshList();
        this.petService.resetForm(form);
        this.toastr.info('Succesvol bijgewerkt', 'Pet');
        this.router.navigateByUrl('list');
      },
      error: err => {
        console.error('Error updating pet:', err);
        this.toastr.error('Fout bij bijwerken', 'Error');
      }
    });
  }

  cancel(): void {
    this.router.navigateByUrl('list');
  }
}
