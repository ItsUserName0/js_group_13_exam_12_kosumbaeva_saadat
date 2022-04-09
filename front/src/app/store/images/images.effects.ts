import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImagesService } from '../../services/images.service';
import {
  createImageFailure,
  createImageRequest,
  createImageSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess, removeImageFailure, removeImageRequest, removeImageSuccess
} from './images.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';

@Injectable()
export class ImagesEffects {
  constructor(private actions: Actions,
              private router: Router,
              private store: Store<AppState>,
              private helpers: HelpersService,
              private imagesService: ImagesService,
  ) {
  }

  fetchImages = createEffect(() => this.actions.pipe(
    ofType(fetchImagesRequest),
    mergeMap(({id}) => this.imagesService.fetchImages(id).pipe(
      map(items => fetchImagesSuccess({items})),
      catchError(() => {
        this.helpers.openSnackBar('Could not get images');
        return of(fetchImagesFailure());
      }),
    )),
  ));

  createImage = createEffect(() => this.actions.pipe(
    ofType(createImageRequest),
    mergeMap(({data}) => this.imagesService.createImage(data).pipe(
      map(() => createImageSuccess()),
      tap(() => {
        this.helpers.openSnackBar('Uploaded successful!');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(createImageFailure),
    )),
  ));

  removeImage = createEffect(() => this.actions.pipe(
    ofType(removeImageRequest),
    mergeMap(({imageId, userId}) => this.imagesService.removeImage(imageId).pipe(
      map(() => removeImageSuccess()),
      tap(() => this.store.dispatch(fetchImagesRequest({id: userId}))),
      catchError(() => {
        this.helpers.openSnackBar('Could not delete image');
        return of(removeImageFailure());
      }),
    )),
  ));
}
