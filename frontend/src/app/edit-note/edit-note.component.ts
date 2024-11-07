import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noteType } from '../types';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent {
  style!: string;
  @Input() noteId!: number;
  @Input() note!: noteType;

  editNoteForm: FormGroup;

  constructor() {
    this.editNoteForm = new FormGroup({
      title: new FormControl(this.note?.title || '', Validators.required),
      content: new FormControl(this.note?.content || '', Validators.required),
      category: new FormControl(this.note?.category || '', Validators.required),
    });
  }

  @Output() closeEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();

  ngOnChanges() {
    if (this.note) {
      this.editNoteForm.patchValue({
        title: this.note.title,
        content: this.note.content,
        category: this.note.category,
      });
    }
  }
  onClose() {
    this.closeEvent.emit();
  }

  editNote(noteID: number) {
    this.note.title = this.editNoteForm.value.title;
    this.note.content = this.editNoteForm.value.content;
    this.note.category = this.editNoteForm.value.category;
    this.editEvent.emit(noteID);
  }
}
