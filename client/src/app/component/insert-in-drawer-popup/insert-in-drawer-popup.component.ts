import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item, ItemTag } from '../../../types';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-insert-in-drawer-popup',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './insert-in-drawer-popup.component.html',
  styleUrl: './insert-in-drawer-popup.component.scss'
})
export class InsertInDrawerPopupComponent {
  @Input() existingItems!: Item[];
  @Input() existingTags!: ItemTag[];

  @Output() finishCreation = new EventEmitter<Item>();
  @Output() abortCreation = new EventEmitter<void>();  

  selectedItem: Item | null = null;

  selectItem(item: Item)
  {
    this.selectedItem = item;
  }

  confirmInsertion()
  {
    if(this.selectedItem == null)
      console.log("No item selected");
    else
      this.finishCreation.emit(this.selectedItem);
  }

  abort()
  {
    this.abortCreation.emit();
  }
}
