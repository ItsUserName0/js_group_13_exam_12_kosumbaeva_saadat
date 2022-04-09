import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Image, ImageData } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  fetchImages(id?: string) {
    const url = id ? `/images?user=${id}` : '/images';
    return this.http.get<Image[]>(environment.apiUrl + url);
  }

  createImage(data: ImageData) {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/images', formData);
  }

  removeImage(imageId: string) {
    return this.http.delete(environment.apiUrl + '/images/' + imageId);
  }
}
