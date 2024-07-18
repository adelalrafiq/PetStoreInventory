import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { PetDetails } from '../../models/petDetails';

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
    this.pet = this.petService.list.find(p => p.id === id);
  }
}
