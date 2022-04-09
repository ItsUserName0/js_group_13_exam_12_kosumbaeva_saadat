import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {
  @Input() image: null | Image = null;

  constructor() { }

  ngOnInit(): void {
  }

}
