import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemTag } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-tag.component.html',
  styleUrl: './item-tag.component.scss'
})
export class ItemTagComponent {
  @Input() tag!: ItemTag;
	@Input() isSelected: boolean = false;
  @Output() onClicked = new EventEmitter<void>();

  tagClicked()
  {
    this.onClicked.emit();
  }

  getClasses()
  {
    return this.isSelected ? ["rounded-background", "selected"] : ["rounded-background"];
  }
}
