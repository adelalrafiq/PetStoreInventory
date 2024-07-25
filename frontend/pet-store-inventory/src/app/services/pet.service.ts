import { HttpClient } from "@angular/common/http";
import { PetDetails } from "../models/petDetails";
import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { NgForm } from "@angular/forms";
import { BehaviorSubject, catchError, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PetService {

    apiUrl: string = environment.apiBaseUrl
    list: PetDetails[] = [];
    filteredList: PetDetails[] = [];
    formData: PetDetails = new PetDetails();
    formSubmitted: boolean = false;
    listUpdated = new BehaviorSubject<PetDetails[]>([]);
    filteredListUpdated = new BehaviorSubject<PetDetails[]>([]);

    constructor(private http: HttpClient) { }

    refreshList() {
        this.http.get<PetDetails[]>(this.apiUrl).subscribe({
            next: data => {
                if (Array.isArray(data)) {
                    this.list = data
                    this.listUpdated.next(this.list);
                    this.filteredList = this.list;
                    this.filteredListUpdated.next(this.filteredList);
                } else {
                    console.error('Received data is not an array:', data);
                    this.list = [];
                    this.listUpdated.next(this.list);
                    this.filteredList = [];
                    this.filteredListUpdated.next(this.filteredList);
                }
            },
            error: err => {
                console.log("error", err);
                this.list = [];
                this.listUpdated.next(this.list);
                this.filteredList = [];
                this.filteredListUpdated.next(this.filteredList);
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

    resetForm(form: NgForm) {
        form.form.reset()
        this.formData = new PetDetails();
        this.formSubmitted = false;
    }
}