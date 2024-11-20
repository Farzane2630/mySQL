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
  newNoteModalVisibility: boolean = false;
  editModalVisibility: boolean = false;
  notes!: noteType[];
  noteId!: number;
  note!: noteType;

  constructor(
    private NotesServices: NotesServices,
    private userServices: UserServices
  ) {}

  ngOnInit(): void {
    if (this.userServices.isLoggedIn()) {
      this.NotesServices.getNotes().subscribe({
        next: (notes) => (this.notes = notes),
        error: (err) => console.error(err),
      });
    } else {
      console.log("you should log in");
    }
  }
  refreshNotes() {
    this.NotesServices.getNotes().subscribe({
      next: (notes) => (this.notes = notes),
      error: (err) => console.error(err),
    });
  }

  addNewNote() {
    this.newNoteModalVisibility = true;
  }
  closeModal() {
    this.newNoteModalVisibility = false;
    this.refreshNotes();
  }

  openEditNote(id: number) {
    this.editModalVisibility = true;
    this.noteId = id;

    const targetNote = this.notes.find((note: noteType) => note.id === id);

    if (targetNote) this.note = targetNote;
  }

  editNote(id: number) {
    const targetNote = this.notes.find((note: noteType) => note.id === id);

    if (targetNote) {
      this.NotesServices.updateNote(id, targetNote).subscribe({
        next: (res) => {
          alert(res.msg);
          this.refreshNotes();
          this.closeEditModal();
        },
      });
    }
  }

  closeEditModal() {
    this.editModalVisibility = false;
  }
  deleteNote(noteID: number) {
    this.NotesServices.deleteNote(noteID).subscribe({
      next: () => {
        this.refreshNotes()
        // this.notes = this.notes.filter((note) => note.id !== noteID);
      },
    });
  }
}
