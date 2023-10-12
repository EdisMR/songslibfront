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
    modified: number
    adminControls:boolean
  } = {
      encoded: '',
      decoded: '',
      modified: 0,
      adminControls:false
    }
  @Input() set lyricsInput(encodedValue: string) {
    this.lyrics.encoded = encodedValue
    this.lyrics.decoded = decodeURIComponent(encodedValue);
  }
  @Input() set adminControls(value: boolean) {
    this.lyrics.adminControls = value
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
    .pipe(debounceTime(1500))
    .subscribe(({ }) => {
      if (this.lyrics.modified>1) this.updateLyrics()
    })

  updateLyrics() {
    this.lyrics.decoded = this.quillEditorRef.innerHTML;
    this.lyrics.encoded = encodeURIComponent(this.lyrics.decoded);
    this.lyricsChange.emit(this.lyrics.encoded);
  }

  private instanciateQuillAdmin(): void {
    let isAdmin: boolean = this.lyrics.adminControls;

    if (!isAdmin) {
      this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.user);
      this.updateSubscription.unsubscribe()
    } else {
      this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.admin);
    }

    this.quillEditorRef.innerHTML = this.lyrics.decoded;

    if (isAdmin) {
      this.QuillEditor.on('text-change', () => {
        this.lyrics.modified++
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
