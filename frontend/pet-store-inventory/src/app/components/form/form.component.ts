import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PetService } from '../../services/pet.service';
import { PetDetails } from '../../models/petDetails';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public petService: PetService,
    private toastr: ToastrService
  ) { }
  petId = this.route.snapshot.paramMap.get('id');
  // numericPetId = Number(this.petId)

  onSubmit(form: NgForm) {
    this.petService.formSubmitted = true;
    if (form.valid) {
      if (!this.petService.formData.id) {
        this.petService.formData.id = uuidv4()
        this.insertRecord(form)
      }
      else
        this.updateRecord(form)
    }
  }

  insertRecord(form: NgForm) {
    this.petService.addNewPet()
      .subscribe({
        next: res => {
          this.petService.list = res as PetDetails[];
          this.petService.resetForm(form);
          this.toastr.success('Succesvol toegevoegd', 'Nieuw Pet')
          this.router.navigateByUrl('/list');
        },
        error: err => {
          console.log(err);

        }
      })
  }

  updateRecord(form: NgForm) {
    this.petService.updatePet()
      .subscribe({
        next: res => {
          const validResponse = res ?? [];
          this.petService.list = validResponse as PetDetails[];
          this.petService.resetForm(form);
          this.toastr.info('Succesvol updated', 'pet')
          this.router.navigateByUrl('/list');
        },
        error: err => {
          console.log(err);
        }
      })
  }

  cancel() {
    this.router.navigateByUrl('/list');
  }

}
