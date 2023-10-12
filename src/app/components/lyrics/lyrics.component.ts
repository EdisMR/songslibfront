import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription, debounceTime } from 'rxjs';

declare var Quill: any;

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LyricsComponent implements AfterViewInit, OnDestroy {

  constructor(
    private elementHtml: ElementRef,
  ) { }
  @ViewChild('editor', { read: ElementRef }) editor!: ElementRef;

  private lyrics: {
    encoded: string
    decoded: string
    modified: boolean
  } = {
      encoded: '',
      decoded: '',
      modified: false
    }
  @Input() set lyricsInput(encodedValue: string) {
    this.lyrics.encoded = encodedValue
    this.lyrics.decoded = decodeURIComponent(encodedValue);
  }
  @Output() lyricsChange = new EventEmitter<string>();

  private QuillEditor!: any;
  QuillOptions = {
    admin: {
      theme: 'snow',
      placeholder: 'Letras y acordes...',
      readOnly: false,
      modules: {
        toolbar: [
          ['bold']
        ],
      }
    },
    user: {
      theme: 'bubble',
      readOnly: true,
    }
  }
  private get quillEditorRef(){
    return this.elementHtml.nativeElement.querySelector('.ql-editor')
  } 


  private updateSubject: BehaviorSubject<{}> = new BehaviorSubject({})
  private updateSubscription: Subscription = this.updateSubject
    .pipe(debounceTime(1200))
    .subscribe(({ }) => {
      if (this.lyrics.modified) this.updateLyrics()
    })

  updateLyrics() {
    this.lyrics.decoded = this.quillEditorRef.innerHTML;
    this.lyrics.encoded = encodeURIComponent(this.lyrics.decoded);
    this.lyricsChange.emit(this.lyrics.encoded);
  }

  private instanciateQuillAdmin(): void {
    let isAdmin: boolean = true;

    if (!isAdmin) {
      this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.user);
      this.updateSubscription.unsubscribe()
    } else {
      this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.admin);
    }

    this.quillEditorRef.innerHTML = this.lyrics.decoded;

    if (isAdmin) {
      this.QuillEditor.on('text-change', () => {
        this.lyrics.modified = true
        this.updateSubject.next({})
      })
    }
  }

  ngAfterViewInit(): void {
    this.instanciateQuillAdmin();
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe()
  }

}
