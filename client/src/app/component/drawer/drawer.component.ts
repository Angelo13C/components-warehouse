import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drawer, Item, ItemTag } from '../../../types';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-drawer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './drawer.component.html',
	styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
	@Input() drawer!: Drawer;
	@Input() existingItems!: Item[];
	@Input() existingTags!: ItemTag[];

	@Output() onClicked = new EventEmitter<void>();

	getAsText(): string {
		let item = DrawerComponent.getItemInDrawer(this.existingItems, this.drawer);
		if (item == undefined) return '    EMPTY    ';

		return ItemComponent.getAsText(item, this.existingTags);
	}
	getStyle() {
		let isEmpty = DrawerComponent.isDrawerIsEmpty(
			this.existingItems,
			this.drawer
		);
		return {
			borderRadius: '10px',
			padding: '15px',
			paddingLeft: '20px',
			paddingRight: '20px',

			border: '4px dashed var(--drawer-border-color)',
			color: isEmpty ? '#9E9E9E' : 'white',
			fontStyle: isEmpty ? 'italic' : '',
			fontWeight: isEmpty ? '' : 'bold',
		};
	}

	drawerClicked() {
		this.onClicked.emit();
	}

	static getItemInDrawer(existingItems: Item[], drawer: Drawer) {
		return existingItems.find((item) => item.id == drawer.itemId);
	}
	static isDrawerIsEmpty(existingItems: Item[], drawer: Drawer) {
		return DrawerComponent.getItemInDrawer(existingItems, drawer) == undefined;
	}
}
