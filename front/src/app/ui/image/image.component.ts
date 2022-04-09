import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../../models/image.model';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {
  @Input() image: null | Image = null;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(ImageModalComponent, {
      width: '650px',
      data: {data: this.image},
    });
  }
}
