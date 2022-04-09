import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createImageRequest } from '../../store/images/images.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.sass']
})
export class EditImageComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.images.createLoading);
    this.error = store.select(state => state.images.createError);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.store.dispatch(createImageRequest({data: this.form.value}));
  }
}
