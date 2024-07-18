import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';


export const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: 'form', component: FormComponent },
    { path: 'form/:id', component: FormComponent },
    { path: 'details/:id', component: DetailsComponent }
];
