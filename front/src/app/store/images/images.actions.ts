import { createAction, props } from '@ngrx/store';
import { Image, ImageData } from '../../models/image.model';

export const fetchImagesRequest = createAction('[Images] Fetch Request', props<{ id: null | string }>());
export const fetchImagesSuccess = createAction('[Images] Fetch Success', props<{ items: Image[] }>());
export const fetchImagesFailure = createAction('[Images] Fetch Failure');

export const createImageRequest = createAction('[Images] Create Request', props<{ data: ImageData }>());
export const createImageSuccess = createAction('[Images] Create Success');
export const createImageFailure = createAction('[Images] Create Failure', props<{ error: null | string }>());
