import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';

@Directive({
  selector: '[appHasRights]'
})
export class HasRightsDirective implements OnInit, OnDestroy {
  @Input('appHasRights') ownerId!: string;
  @Input('appHasRightsElse') elseTemplate?: TemplateRef<any>;

  user: Observable<null | User>;
  userSub!: Subscription;

  constructor(private store: Store<AppState>,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      this.viewContainer.clear();

      if (user && this.ownerId === user._id) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else if (this.elseTemplate) {
        this.viewContainer.createEmbeddedView(this.elseTemplate);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
