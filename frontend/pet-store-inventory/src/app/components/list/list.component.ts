import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PetDetails } from '../../models/petDetails';
import { ChartComponent } from '../chart/chart.component';
import { PetService } from '../../services/pet.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ChartComponent, ToastrModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  list: PetDetails[] = [];

  constructor(
    private router: Router,
    public petService: PetService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.petService.refreshList();
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
          this.toastr.success('Succesvol verwijderd', 'Pet');

        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
