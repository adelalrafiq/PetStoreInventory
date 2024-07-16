import { Routes } from '@angular/router';

import { PetsChartComponent } from './components/pets-chart/pets-chart.component';
import { PetsListComponent } from './components/pets-list/pets-list.component';
import { PetAddComponent } from './components/pet-add/pet-add.component';
import { PetEditComponent } from './components/pet-edit/pet-edit.component';


export const routes: Routes = [
    { path: '', redirectTo: '/pets', pathMatch: 'full' },
    { path: 'pets', component: PetsListComponent },
    { path: 'pets/add', component: PetAddComponent },
    { path: 'pets/edit/:id', component: PetEditComponent },
    { path: 'pets/chart', component: PetsChartComponent }
];
