import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImagesService } from '../../services/images.service';
import { fetchImagesFailure, fetchImagesRequest, fetchImagesSuccess } from './images.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HelpersService } from '../../services/helpers.service';

@Injectable()
export class ImagesEffects {
  constructor(private actions: Actions,
              private helpers: HelpersService,
              private imagesService: ImagesService,
  ) { }

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
}
