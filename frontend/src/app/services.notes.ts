import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { noteType } from "./types";

@Injectable({
  providedIn: "root",
})
export class NotesServices {
  private ApiUrl = "http://127.0.0.1:8000/api/notes";
  token = localStorage.getItem("token");
  constructor(private http: HttpClient) {}

  getNotes(): Observable<any> {
  
    if (!this.token) {
      console.log("No token found");
      return throwError(() => new Error("No token found"));
    }
  
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get(this.ApiUrl, { headers }).pipe(
      catchError((error) => {
        console.error("Failed to fetch notes:", error);
        return throwError(() => error);
      })
    );
  }

  getOneNote(noteID: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/${noteID}`);
  }
  
  createNewNote(note: noteType): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
    return this.http.post(this.ApiUrl, note, {headers});
  }

  deleteNote(noteID: number): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

    return this.http.delete(`${this.ApiUrl}/${noteID}`, {headers});
  }

  updateNote(noteID: number, targetNote: noteType): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

    return this.http.put(`${this.ApiUrl}/${noteID}`, targetNote, {headers});
  }
}
