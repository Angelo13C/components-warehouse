import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemTag } from '../../../types';
import { ItemTagComponent } from '../item-tag/item-tag.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-item-popup',
  standalone: true,
  imports: [CommonModule, ItemTagComponent],
  templateUrl: './new-item-popup.component.html',
  styleUrl: './new-item-popup.component.scss'
})
export class NewItemPopupComponent {
  @Input() existingTags!: ItemTag[];

  @Output() finishCreation = new EventEmitter<number[]>();
  @Output() abortCreation = new EventEmitter<void>();  

  selectedTagsIds: number[] = [];

  selectTag(tag: ItemTag)
  {
    let index = this.selectedTagsIds.indexOf(tag.id);
    if(index == -1)
      this.selectedTagsIds.push(tag.id);
    else
      this.selectedTagsIds.splice(index, 1);
  }

  confirmNewItem()
  {
    if(this.selectedTagsIds.length == 0)
      console.log("No tag");
    else
      this.finishCreation.emit(this.selectedTagsIds);
  }

  abort()
  {
    this.abortCreation.emit();
  }
}
