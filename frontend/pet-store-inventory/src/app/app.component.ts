import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalAddComponent } from './components/animal-add/animal-add.component';
import { AnimalEditComponent } from './components/animal-edit/animal-edit.component';
import { AnimalDeleteComponent } from './components/animal-delete/animal-delete.component';
import { AnimalChartComponent } from './components/animal-chart/animal-chart.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    FormsModule,
    AnimalListComponent,
    AnimalAddComponent,
    AnimalEditComponent,
    AnimalDeleteComponent,
    AnimalChartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-store-inventory';
}
