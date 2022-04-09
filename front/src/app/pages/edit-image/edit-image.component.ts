import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createImageRequest } from '../../store/images/images.actions';
import { NgForm } from '@angular/forms';
import { CreateError } from '../../models/image.model';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.sass']
})
export class EditImageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;

  loading: Observable<boolean>;
  error: Observable<null | CreateError>;
  errSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.images.createLoading);
    this.error = store.select(state => state.images.createError);
  }

  ngAfterViewInit(): void {
    this.errSub = this.error.subscribe(err => {
      if (err) {
        const msg = err.errors.image.message;
        this.form.form.get('image')?.setErrors({serverError: msg});
      } else {
        this.form.form.get('image')?.setErrors(null);
      }
    });
  }

  onSubmit() {
    this.store.dispatch(createImageRequest({data: this.form.value}));
  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }
}
