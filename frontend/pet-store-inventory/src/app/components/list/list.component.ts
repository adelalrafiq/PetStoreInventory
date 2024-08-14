import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetDetails } from '../../models/petDetails';
import { ChartComponent } from '../chart/chart.component';
import { PetService } from '../../services/pet.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';


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
  isLoading$: Observable<boolean> = this.petService.loading$;

  constructor(
    private router: Router,
    public petService: PetService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.refreshList();
    this.petService.filteredList$.subscribe((list: PetDetails[]) => {
      this.filteredPets = list;
    });
  }

  onSearchTextChange(searchText: string): void {
    this.searchText = searchText;
    this.petService.filterPets(this.searchText);
  }
  populateForm(selectedRecord: PetDetails): void {
    this.petService.formData = Object.assign({}, selectedRecord);
    this.router.navigateByUrl(`form/${selectedRecord.id}`);
  }

  onDelete(id: string): void {
    if (confirm('Weet je zeker dat je dit wilt verwijderen?')) {
      this.petService.deletePet(id).subscribe({
        next: res => {
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
