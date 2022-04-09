import { ImagesState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createImageFailure,
  createImageRequest,
  createImageSuccess,
  fetchImagesFailure,
  fetchImagesRequest,
  fetchImagesSuccess, removeImageFailure, removeImageRequest, removeImageSuccess,
} from './images.actions';

const initialState: ImagesState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  createError: null,
  removeLoading: false,
};

export const imagesReducer = createReducer(
  initialState,
  on(fetchImagesRequest, state => ({...state, fetchLoading: true})),
  on(fetchImagesSuccess, (state, {items}) => ({...state, fetchLoading: false, items})),
  on(fetchImagesFailure, state => ({...state, fetchLoading: false})),
  on(createImageRequest, state => ({...state, createLoading: true, createError: null})),
  on(createImageSuccess, state => ({...state, createLoading: false})),
  on(createImageFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
  on(removeImageRequest, state => ({...state, removeLoading: true})),
  on(removeImageSuccess, state => ({...state, removeLoading: false})),
  on(removeImageFailure, state => ({...state, removeLoading: true})),
);
