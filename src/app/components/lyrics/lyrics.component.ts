import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

declare var Quill: any;

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LyricsComponent implements AfterViewInit {
  @ViewChild('editor', { read: ElementRef }) editor!: ElementRef;

  constructor() {}

  lyrics: string = '';
  @Input() set lyricsInput(value: string) {
    let decodedValue = decodeURIComponent(value);
    this.lyrics = decodedValue;
  }
  @Output() lyricsChange = new EventEmitter<string>();

  private QuillEditor: any;
  QuillOptions:any = {
    admin: {
      theme: 'snow',
      placeholder: 'Letras y acordes...',
      readOnly: false,
      modules: {
        toolbar: [
          ['bold']
        ]
      }
    },
    user: {
      theme: 'bubble',
      readOnly: true,
    }
  }

  updateLyrics(): void {
    let lyricText = this.QuillEditor.getContents().ops[0].insert;
    this.lyrics = encodeURIComponent(lyricText);
    this.lyricsChange.emit(this.lyrics);
  }


  private instanciateQuillAdmin(): void {
    /* user */
    //this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.user);
    
    /* admin */
    this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.admin);

    this.QuillEditor.setText(decodeURIComponent(this.lyrics));
  }

  ngAfterViewInit(): void {
    this.instanciateQuillAdmin();
  }

}
