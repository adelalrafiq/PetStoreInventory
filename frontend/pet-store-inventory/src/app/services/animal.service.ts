import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal } from "../models/animal";
import { environment } from "../../environments/environment.development";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // This makes the service available application-wide
})

export class AnimalService {
    // private apiUrl = 'https://localhost:5001/api/animals';
    apiUrl: string = environment.apiBaseUrl + '/animals'

    constructor(private http: HttpClient) { }

    getAnimals() {
        this.http.get<Animal[]>(this.apiUrl).subscribe({
            next: res => {
                console.log("service", res);

            },
            error: err => {
                console.log("error", err);
            }
        })
    }

    // getAnimal(id: number): Observable<Animal> {
    //     return this.http.get<Animal>(`${this.apiUrl}/${id}`);
    // }

    // addAnimal(animal: Animal): Observable<Animal> {
    //     return this.http.post<Animal>(this.apiUrl, animal);
    // }

    // updateAnimal(animal: Animal): Observable<Animal> {
    //     return this.http.put<Animal>(`${this.apiUrl}/${animal.id}`, animal);
    // }

    // deleteAnimal(id: number): Observable<Animal> {
    //     return this.http.delete<Animal>(`${this.apiUrl}/${id}`);
    // }
}