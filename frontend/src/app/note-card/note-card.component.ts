import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { noteType } from '../types';
import { DatePipe } from '@angular/common';
import { NotesServices } from '../services.notes';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
  providers: [DatePipe],
})
export class noteCardComponent {
  @Input() note!: noteType;

  @Output() editEvent = new EventEmitter<number>()
  @Output() deleteEvent = new EventEmitter<any>()

  constructor(
    private datePipe: DatePipe,
    private NotesServices: NotesServices
  ) {}

  get formattedDate(): string | null {
    return this.datePipe.transform(this.note.created_at, 'yyyy.MM.dd - HH:mm');
  }

  deleteNote(noteID: number) {
    this.deleteEvent.emit(noteID)
    // this.NotesServices.deleteNote(noteID).subscribe();
  }

  editNote(noteID: number){    
   this.editEvent.emit(noteID);
  }
}
