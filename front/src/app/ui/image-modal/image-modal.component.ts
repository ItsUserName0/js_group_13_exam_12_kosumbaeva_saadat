import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.sass']
})
export class ImageModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {data: Image | null},
  ) {
  }

  ngOnInit(): void {
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }

}
