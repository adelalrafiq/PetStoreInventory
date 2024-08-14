import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { PetDetails } from '../../models/petDetails';
import { switchMap } from 'rxjs';
import { format, setDefaultOptions } from 'date-fns';
import { nl } from 'date-fns/locale';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  pet?: PetDetails;
  constructor(private route: ActivatedRoute, private petService: PetService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.petService.filteredList$.pipe(
        switchMap(pets => pets.find(pet => pet.id === id) ? [pets.find(pet => pet.id === id) as PetDetails] : [])
      ).subscribe(pet => {
        this.pet = pet;
      }
      );

    } else {
      console.error('No pet ID found in route');

    }
  }

  formatDate(dateString?: Date) {
    if (dateString) {
      console.log(dateString.toISOString);


    }
    const date = new Date(dateString as Date).toISOString();
    console.log({ date });
    return format(date, 'dd/MM/yyyy HH:mm:ss');

  }


}
