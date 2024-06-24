import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item, ItemTag } from '../../../types';
import { NewButtonComponent } from '../../component/new-button/new-button.component';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../../component/item/item.component';
import { NewItemPopupComponent } from '../../component/new-item-popup/new-item-popup.component';
import { ItemTagService } from '../../services/item-tag.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, NewButtonComponent, NewItemPopupComponent, ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  constructor(private itemService: ItemService, private itemTagService: ItemTagService) { }

  items: Item[] = [];
  tags: ItemTag[] = [];

  isPopupVisible: boolean = false;

  errorMessage: string = "";

  ngOnInit()
  {
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.items = items;
    });
    this.itemTagService.getItemTags().subscribe((tags: ItemTag[]) => {
      this.tags = tags;
    });
  }

  removeItem(item: Item)
  {
    this.itemService.deleteItem(item).subscribe(
      (_response) => {
        this.items = this.items.filter(t => t !== item);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  showPopup()
  {
    this.isPopupVisible = true;
    this.errorMessage = "";
  }

  hidePopup()
  {
    this.isPopupVisible = false;
  }

  createItem(tagsIds: number[])
  {
    this.hidePopup();
    
    this.itemService.createItem(tagsIds).subscribe(
      (response) => {
        this.items.push(response);
      },
      (error) => {
        this.errorMessage = error.error.error.message;
        console.error('Error creating item:', error);
      }
    );
  }
}
