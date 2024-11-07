import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { noteType } from "./types";

@Injectable({
  providedIn: "root",
})
export class NotesServices {
  private ApiUrl = "http://127.0.0.1:8000/notes";
  constructor(private http: HttpClient) {}

  getNotes(): Observable<any> {
    return this.http.get(this.ApiUrl);
  }

  getOneNote(noteID: number): Observable<any> {
    return this.http.get(`${this.ApiUrl}/${noteID}`);
  }

  createNewNote(note: noteType): Observable<any> {
    return this.http.post(this.ApiUrl, note);
  }

  deleteNote(noteID: number): Observable<any> {
    return this.http.delete(`${this.ApiUrl}/${noteID}`);
  }

  updateNote(noteID: number, targetNote: noteType): Observable<any> {
    return this.http.put(`${this.ApiUrl}/${noteID}`, targetNote);
  }
}
