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
  @ViewChild('editor', { read: ElementRef }) editor!: ElementRef;

  constructor() { }

  private lyrics: {
    encoded: string;
    decoded: string
  } = {
      encoded: '',
      decoded: ''
    }
  @Input() set lyricsInput(encodedValue: string) {
    this.lyrics.encoded = encodedValue
    this.lyrics.decoded = decodeURIComponent(encodedValue);
  }
  @Output() lyricsChange = new EventEmitter<string>();

  private QuillEditor: any;
  QuillOptions: any = {
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


  private updateSubject: BehaviorSubject<{}> = new BehaviorSubject({})
  private updateSubscription: Subscription = this.updateSubject
    .pipe(debounceTime(1200))
    .subscribe(({ }) => {
      this.lyrics.decoded = this.QuillEditor.getContents().ops[0].insert;
      this.lyrics.encoded = encodeURIComponent(this.lyrics.decoded);
      this.lyricsChange.emit(this.lyrics.encoded);
      console.log(this.lyrics.decoded)
    })

  private instanciateQuillAdmin(): void {
    let isAdmin: boolean = true;

    if (!isAdmin) {
      this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.user);
      this.updateSubscription.unsubscribe()
    } else {
      this.QuillEditor = new Quill(this.editor.nativeElement, this.QuillOptions.admin);
    }

    this.QuillEditor.setText(decodeURIComponent(this.lyrics.decoded));

    if (isAdmin) {
      this.QuillEditor.on('text-change', () => {
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
