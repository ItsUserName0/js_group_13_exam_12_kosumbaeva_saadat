import { createAction, props } from '@ngrx/store';
import { Image } from '../../models/image.model';

export const fetchImagesRequest = createAction('[Images] Fetch Request', props<{ id: null | string }>());
export const fetchImagesSuccess = createAction('[Images] Fetch Success', props<{ items: Image[] }>());
export const fetchImagesFailure = createAction('[Images] Fetch Failure');
