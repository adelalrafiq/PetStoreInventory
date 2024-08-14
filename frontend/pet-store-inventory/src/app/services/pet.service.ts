import { HttpClient } from "@angular/common/http";
import { PetDetails } from "../models/petDetails";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { NgForm } from "@angular/forms";
import { catchError, finalize, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PetService {

  private apiUrl: string = environment.apiBaseUrl;
  private listSubject = new BehaviorSubject<PetDetails[]>([]);
  private filteredListSubject = new BehaviorSubject<PetDetails[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  list$ = this.listSubject.asObservable();
  filteredList$ = this.filteredListSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  formData: PetDetails = new PetDetails();
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) { }

  refreshList() {
    this.loadingSubject.next(true);
    this.http.get<PetDetails[]>(this.apiUrl).pipe(
      tap(data => {


        if (Array.isArray(data)) {
          const date5 = new Date();
          console.log({ date5 });

          const sortedData = data.sort((a, b) => {

            console.log('Adel=========', new Date(b.datumVanBinnenkomst || "").getTime());

            return new Date(b.datumVanBinnenkomst || "").getTime() - new Date(a.datumVanBinnenkomst || "").getTime();
          })
          this.listSubject.next(sortedData);
          this.filteredListSubject.next(sortedData);
        } else {
          console.error('Received data is not an array:', data);
          this.listSubject.next([]);
          this.filteredListSubject.next([]);
        }
      }),
      catchError(err => {
        console.error('Error fetching pets:', err);
        this.listSubject.next([]);
        this.filteredListSubject.next([]);
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe();
  }

  filterPets(searchText: string) {
    this.list$.subscribe(pets => {
      const trimmedSearchText = searchText.trim().toLowerCase();
      const filtered = pets.filter(pet =>
        pet.naam.toLowerCase().includes(trimmedSearchText) ||
        pet.diersoort.toLowerCase().includes(trimmedSearchText) ||
        pet.leeftijd.toString().includes(trimmedSearchText) ||
        pet.prijs.toString().includes(trimmedSearchText) ||
        pet.geslacht.toLowerCase().includes(trimmedSearchText)
      );
      const sortedFilteredPets = filtered.sort((a, b) => {
        return (b.datumVanBinnenkomst || "") > (a.datumVanBinnenkomst || "") ? 1 : -1;
      });
      this.filteredListSubject.next(sortedFilteredPets); // Emit filtered list
    });
  }


  addNewPet(): Observable<any> {
    return this.http.post(this.apiUrl, this.formData).pipe(
      catchError(err => {
        console.error('Error adding pet:', err);
        return of(null);
      })
    );
  }

  updatePet(): Observable<any> {
    return this.http.put(`${this.apiUrl}/${this.formData.id}`, this.formData).pipe(
      catchError(err => {
        console.error('Error updating pet:', err);
        return of(null);  // Return null on error
      })
    );
  }

  deletePet(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error deleting pet:', err);
        return of(null);  // Return null on error
      })
    );
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.formData = new PetDetails();
    this.formSubmitted = false;
  }
}