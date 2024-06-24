import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item, ItemTag } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-item',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './item.component.html',
	styleUrl: './item.component.scss',
})
export class ItemComponent {
	@Input() item!: Item;
	@Input() existingTags!: ItemTag[];
	@Input() isSelected: boolean = false;

	@Output() onClicked = new EventEmitter<void>();

	itemClicked() {
		this.onClicked.emit();
	}

	getAsText(): string {
		return ItemComponent.getAsText(this.item, this.existingTags);
	}

	getClasses()
	{
		return this.isSelected ? ["rounded-background", "selected"] : ["rounded-background"];
	}
	
	static getAsText(item: Item, existingTags: ItemTag[]): string {
		return item.tagsIds
			.map((tagId) => {
				const tag = existingTags.find((t) => t.id === tagId);
				return tag ? tag.label : 'Unknown tag';
			})
			.join(' - ');
	}
}
