import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { jugador } from "../Interfaces/jugador";

@Injectable({
    providedIn: "root"
})

export class JugadorProvider {

    constructor(private http: HttpClient) { }

    getAll(): Observable<jugador[]> {
        const url = environment.url + 'Jugador';
        return this.http.get<jugador[]>(url).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.log("algo paso, error: " + error.message)
        }
        else {
            console.log("Status code: " + error.status);
            console.log(error);
        }
        return throwError(() => new Error(error.error))
    }

    create(
        nombre?: string,
        posicion?: string,
        dorsal?: number): Observable<jugador> {
        const url = environment.url + "Jugador";
        const request = {
            "nombre": nombre,
            "posicion": posicion,
            "dorsal": dorsal
        }
        const header = { 'content-type': 'application/json' };
        return this.http.post<jugador>(url, request, { headers: header }).pipe(catchError(this.handleError));
    }

    getById(id: number): Observable<jugador> {
        const url = environment.url + "Jugador/" + id;
        return this.http.get<jugador>(url).pipe(catchError(this.handleError));
    }

    edit(id?: number,
        nombre?: string,
        posicion?: string,
        dorsal?: number): Observable<jugador>{
            const url = environment.url + "Jugador/" + id;
            const request = {
                "nombre": nombre,
                "posicion": posicion,
                "dorsal": dorsal
            }
            const header = { 'content-type': 'application/json' };
            return this.http.put<jugador>(url,request,{headers: header}).pipe(catchError(this.handleError));
        }

        delete(id: number): Observable<any>{
            const url = environment.url+ 'Jugador/'+ id;
            return this.http.delete(url).pipe(catchError(this.handleError)); 
        }

}