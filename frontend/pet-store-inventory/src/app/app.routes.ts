import { Routes } from '@angular/router';
import { AnimalAddComponent } from './components/animal-add/animal-add.component';
import { AnimalChartComponent } from './components/animal-chart/animal-chart.component';
import { AnimalDeleteComponent } from './components/animal-delete/animal-delete.component';
import { AnimalEditComponent } from './components/animal-edit/animal-edit.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/animals', pathMatch: 'full'},
    { path: 'animals', component: AnimalListComponent},
    { path: 'animals/add', component: AnimalAddComponent},
    { path: 'animals/edit/:id', component: AnimalEditComponent},
    { path: 'animals/delete/:id', component: AnimalDeleteComponent},
    { path: 'animals/chart', component: AnimalChartComponent}  
];
