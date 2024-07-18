import { HttpClient } from "@angular/common/http";
import { PetDetails } from "../models/petDetails";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BehaviorSubject, catchError, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root' // This makes the service available application-wide
})

export class PetService {

    apiUrl: string = environment.apiBaseUrl
    list: PetDetails[] = [];
    formData: PetDetails = new PetDetails();
    formSubmitted: boolean = false;
    listUpdated = new BehaviorSubject<void>(undefined);

    constructor(private http: HttpClient) { }

    refreshList() {
        this.http.get<PetDetails[]>(this.apiUrl).subscribe({
            next: data => {
                this.list = data as PetDetails[]
                this.listUpdated.next();
            },
            error: err => {
                console.log("error", err);
            }
        })
    }

    addNewPet() {
        return this.http.post(this.apiUrl, this.formData)
    }
    updatePet() {
        return this.http.put(`${this.apiUrl}/${this.formData.id}`, this.formData)
    }

    deletePet(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    // deletePet(id: number): Observable<PetDetails[]> {
    //     return this.http.delete<PetDetails[]>(`${this.apiUrl}/${id}`).pipe(
    //         catchError(error => {
    //             // Verwerk de fout, log het of geef een lege array terug
    //             console.error(error);
    //             return of([]); // Geeft een lege array terug in geval van een fout
    //         })
    //     );
    // }

    resetForm(form: NgForm) {
        form.form.reset()
        this.formData = new PetDetails();
        this.formSubmitted = false;
    }
}