import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Image } from '../../models/image.model';
import { fetchImagesRequest } from '../../store/images/images.actions';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit {
  images: Observable<Image[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.images = store.select(state => state.images.items);
    this.loading = store.select(state => state.images.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchImagesRequest({id: null}));
  }

}
