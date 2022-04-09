import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  fetchImages(id: null | string) {
    const url = id ? `/images?user=${id}` : '/images';
    return this.http.get<Image[]>(environment.apiUrl + url);
  }
}
