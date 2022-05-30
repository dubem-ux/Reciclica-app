import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/store/loading/appState';
import { IloadingState } from 'src/store/loading/loadingState';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  loadingState$: Observable<IloadingState>;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.loadingState$ = this.store.select('loading');
  }

}
