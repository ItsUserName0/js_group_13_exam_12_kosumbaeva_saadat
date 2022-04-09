import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Image } from '../../models/image.model';
import { ActivatedRoute } from '@angular/router';
import { fetchImagesRequest, removeImageRequest } from '../../store/images/images.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-images',
  templateUrl: './user-images.component.html',
  styleUrls: ['./user-images.component.sass']
})
export class UserImagesComponent implements OnInit, OnDestroy {
  user: Observable<null | User>;
  userSub!: Subscription;
  userData!: User | null;
  images: Observable<Image[]>;
  imagesSub!: Subscription;
  loading: Observable<boolean>;
  removeLoading: Observable<boolean>;
  currentImage = '';

  params: string | undefined;
  author!: string;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,) {
    this.user = store.select(state => state.users.user);
    this.images = store.select(state => state.images.items);
    this.loading = store.select(state => state.images.fetchLoading);
    this.removeLoading = store.select(state => state.images.removeLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.params = params['id'];
      this.store.dispatch(fetchImagesRequest({id: params['id']}));
    });

    this.userSub = this.user.subscribe(user => {
      this.userData = user;
    })

    this.imagesSub = this.images.subscribe(images => {
      if (images.length) {
        this.author = images[0].user.displayName;
      }
    });
  }

  removeImage(imageId: string) {
    this.currentImage = imageId;
    this.store.dispatch(removeImageRequest({imageId: imageId, userId: this.userData?._id}));
  }

  ngOnDestroy(): void {
    this.imagesSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
