import { ImagesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { fetchImagesFailure, fetchImagesRequest, fetchImagesSuccess } from './images.actions';

const initialState: ImagesState = {
  items: [],
  fetchLoading: false,
};

export const imagesReducer = createReducer(
  initialState,
  on(fetchImagesRequest, state => ({...state, fetchLoading: true})),
  on(fetchImagesSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchImagesFailure, state => ({...state, fetchLoading: false})),
);
