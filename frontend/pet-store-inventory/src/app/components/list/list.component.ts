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
  filteredPets: PetDetails[] = [];

  constructor(
    private router: Router,
    public petService: PetService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.petService.refreshList();
    this.petService.listUpdated.subscribe((list: PetDetails[]) => {
      this.petService.list = list;
      this.filterPets();
    });
  }

  filterPets(): void {
    this.searchText = this.searchText.trimStart();
    if (Array.isArray(this.petService.list)) {
      this.filteredPets = this.petService.list.filter(pet =>
        pet.naam.toLowerCase().includes(this.searchText.toLowerCase()) ||
        pet.diersoort.toLowerCase().includes(this.searchText.toLowerCase()) ||
        pet.leeftijd.toString().includes(this.searchText) ||
        pet.prijs.toString().includes(this.searchText) ||
        pet.geslacht.toLowerCase().includes(this.searchText.toLowerCase())
      ).sort((a, b) => a.datumVanBinnenkomst > b.datumVanBinnenkomst ? -1 : 1);
      this.petService.filteredListUpdated.next(this.filteredPets);
    } else {
      console.log(Array.isArray(this.petService.list));
      console.error('PetService.list is not an array:', this.petService.list);
      this.filteredPets = [];
      this.petService.filteredListUpdated.next(this.filteredPets);

    }
  }

  populateForm(selectedRecord: PetDetails) {
    this.petService.formData = Object.assign({}, selectedRecord);
    this.router.navigateByUrl(`form/${selectedRecord.id}`);
  }

  onDelete(id: string) {
    if (confirm('Weet je zeker dat je dit wilt verwijderen?')) {
      this.petService.deletePet(id).subscribe({
        next: res => {
          const validResponse = res ?? [];
          this.petService.list = validResponse as PetDetails[];
          this.petService.refreshList();
          this.toastr.success('Succesvol verwijderd', 'Pet');
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
