import { Component, OnInit } from '@angular/core';
import { NewNoteComponent } from '../new-note/new-note.component';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { AddButtonComponent } from '../add-button/add-button.component';
import { noteCardComponent } from '../note-card/note-card.component';
import { NotesServices } from '../services.notes';
import { noteType } from '../types';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NewNoteComponent,
    SearchBoxComponent,
    AddButtonComponent,
    noteCardComponent,
    EditNoteComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  style: string = 'visibility: hidden';
  editModalStyle: string = 'visibility: hidden';
  notes!: noteType[];
  noteId!: number;
  note!: noteType;

  constructor(private NotesServices: NotesServices) {}

  addNewNote() {
    this.style = 'visibility: visible';
  }
  closeModal() {
    this.style = 'visibility: hidden';
  }

  openEditNote(id: number) {
    this.editModalStyle = 'visibility: visible';
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
    this.editModalStyle = 'visibility: hidden';
  }

  ngOnInit(): void {
    this.NotesServices.getNotes().subscribe(
      (res: noteType[]) => (this.notes = res)
    );
  }

  deleteNote(noteID: number) {
    this.NotesServices.deleteNote(noteID).subscribe();
  }
}
