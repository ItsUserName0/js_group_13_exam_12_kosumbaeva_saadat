import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImagesService } from '../../services/images.service';
import {
  createImageFailure,
  createImageRequest,
  createImageSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess
} from './images.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';
import { Router } from '@angular/router';

@Injectable()
export class ImagesEffects {
  constructor(private actions: Actions,
              private router: Router,
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
      catchError(() => {
        this.helpers.openSnackBar('Something went wrong!');
        return of(createImageFailure({error: 'Wrong data!'}));
      })
    )),
  ));
}
