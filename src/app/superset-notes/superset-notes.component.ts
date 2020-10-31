import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'superset-notes',
  templateUrl: './superset-notes.component.html',
  styleUrls: ['./superset-notes.component.css']
})
export class SupersetNotesComponent implements OnInit {
  noteMessage = "";
  @Input('superset') superset
  constructor() { }

  ngOnInit() {
  }
  addNote(note:string){
    note = note.replace(/(\r\n|\n|\r)/gm, " ");
    this.superset.addNote(note);
    console.log(this.superset.notes)
    this.noteMessage = '';
  }

  removeNote(index){
    this.superset.removeNote(index)
  }

}
