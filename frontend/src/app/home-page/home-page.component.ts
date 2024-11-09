import { Component, OnInit } from "@angular/core";
import { NewNoteComponent } from "../new-note/new-note.component";
import { SearchBoxComponent } from "../search-box/search-box.component";
import { AddButtonComponent } from "../add-button/add-button.component";
import { noteCardComponent } from "../note-card/note-card.component";
import { NotesServices } from "../services.notes";
import { noteType } from "../types";
import { EditNoteComponent } from "../edit-note/edit-note.component";
import { UserServices } from "../services.user";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [
    NewNoteComponent,
    SearchBoxComponent,
    AddButtonComponent,
    noteCardComponent,
    EditNoteComponent,
  ],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
})
export class HomePageComponent implements OnInit {
  style: string = "visibility: hidden";
  editModalStyle: string = "visibility: hidden";
  notes!: noteType[];
  noteId!: number;
  note!: noteType;

  constructor(
    private NotesServices: NotesServices,
    private userServices: UserServices
  ) {}

  addNewNote() {
    this.style = "visibility: visible";
  }
  closeModal() {
    this.style = "visibility: hidden";
  }

  openEditNote(id: number) {
    this.editModalStyle = "visibility: visible";
    this.noteId = id;

    const targetNote = this.notes.find((note: noteType) => note.id === id);

    if (targetNote) this.note = targetNote;
  }

  editNote(id: number) {
    const targetNote = this.notes.find((note: noteType) => note.id === id);

    if (targetNote) {
      this.NotesServices.updateNote(id, targetNote).subscribe((res) =>
        alert(res.message)
      );

      this.closeEditModal();
    }
  }

  closeEditModal() {
    this.editModalStyle = "visibility: hidden";
  }

  ngOnInit(): void {
    if (this.userServices.isLoggedIn()) {
      this.NotesServices.getNotes().subscribe({
        next: (notes) => (this.notes = notes),
        error: (err) => console.error(err),
      });
    }else{
      console.log("you should log in");
      
    }
  }

  deleteNote(noteID: number) {
    this.NotesServices.deleteNote(noteID).subscribe();
  }
}
