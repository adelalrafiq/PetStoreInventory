import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pet } from "../models/pet";
import { environment } from "../../environments/environment.development";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // This makes the service available application-wide
})

export class PetService {

    apiUrl: string = environment.apiBaseUrl + '/petstore'

    constructor(private http: HttpClient) { }

    getPets() {
        this.http.get<Pet[]>(this.apiUrl).subscribe({
            next: res => {
                console.log("service", res);

            },
            error: err => {
                console.log("error", err);
            }
        })
    }

    // getPet(id: number): Observable<Pet> {
    //     return this.http.get<Pet>(`${this.apiUrl}/${id}`);
    // }

    // addPet(Pet: Pet): Observable<Pet> {
    //     return this.http.post<Pet>(this.apiUrl, Pet);
    // }

    // updatePet(Pet: Pet): Observable<Pet> {
    //     return this.http.put<Pet>(`${this.apiUrl}/${Pet.id}`, Pet);
    // }

    // deletePet(id: number): Observable<Pet> {
    //     return this.http.delete<Pet>(`${this.apiUrl}/${id}`);
    // }
}