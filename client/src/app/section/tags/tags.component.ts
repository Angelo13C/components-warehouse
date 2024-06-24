import { Component, Input } from '@angular/core';
import { ItemTagService } from '../../services/item-tag.service';
import { ItemTag } from '../../../types';
import { ItemTagComponent } from '../../component/item-tag/item-tag.component';
import { CommonModule } from '@angular/common';
import { NewButtonComponent } from '../../component/new-button/new-button.component';
import { NewItemTagPopupComponent } from '../../component/new-item-tag-popup/new-item-tag-popup.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, ItemTagComponent, NewButtonComponent, NewItemTagPopupComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  constructor(private service: ItemTagService) { }

  tags: ItemTag[] = [];

  isPopupVisible: boolean = false;

  errorMessage: string = "";

  ngOnInit()
  {
    this.service.getItemTags().subscribe((tags: ItemTag[]) => {
      this.tags = tags;
    });
  }

  removeTag(tag: ItemTag)
  {
    this.service.deleteItemTag(tag).subscribe(
      (_response) => {
        this.tags = this.tags.filter(t => t !== tag);
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

  createTag(label: string)
  {
    this.isPopupVisible = false;
    this.service.createItemTag(label).subscribe(
      (response) => {
        this.tags.push(response);
      },
      (error) => {
        this.errorMessage = error.error.error.message;
        console.error('Error creating item:', error);
      }
    );
  }
}
