import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetDetails } from '../../models/petDetails';
import { ChartComponent } from '../chart/chart.component';
import { PetService } from '../../services/pet.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ChartComponent, ToastrModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  searchText: string = '';
  filteredPets: any[] = [];
  list: PetDetails[] = [];

  constructor(
    private router: Router,
    public petService: PetService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.petService.refreshList();
    this.petService.listUpdated.subscribe(() => {
      this.filteredPets = this.petService.list;
      this.filterPets();
    });
    this.filteredPets = this.petService.list;
    this.filterPets();
  }

  // ngOnChanges(): void {
  //   this.filterPets();
  // }

  filterPets(): void {
    this.searchText = this.searchText.trimStart();
    this.filteredPets = this.petService.list.filter(pet =>
      pet.naam.toLowerCase().includes(this.searchText.toLowerCase()) ||
      pet.diersoort.toLowerCase().includes(this.searchText.toLowerCase()) ||
      pet.leeftijd.toString().includes(this.searchText) ||
      pet.prijs.toString().includes(this.searchText) ||
      pet.geslacht.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  populateForm(selectedRecord: PetDetails) {
    this.petService.formData = Object.assign({}, selectedRecord);
    this.router.navigateByUrl(`list/form/${selectedRecord.id}`);
  }

  onDelete(id: string) {
    if (confirm('Weet je zeker dat je dit wilt verwijderen?')) {
      this.petService.deletePet(id).subscribe({
        next: res => {
          const validResponse = res ?? [];
          this.petService.list = validResponse as PetDetails[];
          this.petService.refreshList();
          this.filteredPets = this.petService.list;
          this.filterPets();
          this.toastr.success('Succesvol verwijderd', 'Pet');

        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
