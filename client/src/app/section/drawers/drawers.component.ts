import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerComponent } from '../../component/drawer/drawer.component';
import { Drawer, Item, ItemTag } from '../../../types';
import { ItemService } from '../../services/item.service';
import { ItemTagService } from '../../services/item-tag.service';
import { DrawerService } from '../../services/drawer.service';
import { InsertInDrawerPopupComponent } from '../../component/insert-in-drawer-popup/insert-in-drawer-popup.component';

@Component({
	selector: 'app-drawers',
	standalone: true,
	imports: [CommonModule, DrawerComponent, InsertInDrawerPopupComponent],
	templateUrl: './drawers.component.html',
	styleUrl: './drawers.component.scss',
})
export class DrawersComponent {
	constructor(
		private drawerService: DrawerService,
		private itemService: ItemService,
		private itemTagService: ItemTagService
	) {}

	existingItems: Item[] = [];
	existingTags: ItemTag[] = [];
	rows: Drawer[][] = [];

	isPopupVisible: boolean = false;
	insertingInDrawer: Drawer | null = null;

	clickDrawer(drawer: Drawer) {
		if (DrawerComponent.isDrawerIsEmpty(this.existingItems, drawer))
			this.showPopup(drawer);
		else
			this.setItemInDrawer(drawer, {
				id: 0,
				tagsIds: [],
			});
	}

	showPopup(drawer: Drawer) {
		this.isPopupVisible = true;
		this.insertingInDrawer = drawer;
	}

	hidePopup() {
		this.isPopupVisible = false;
	}

	finishInsertion(insertedItem: Item) {
		this.hidePopup();

		if (this.insertingInDrawer != null)
			this.setItemInDrawer(this.insertingInDrawer, insertedItem);
	}

	setItemInDrawer(drawer: Drawer, item: Item) {
		this.drawerService
			.updateDrawer(drawer, item)
			.subscribe(
				(_) => {
					drawer.itemId = item.id;
					drawer.itemCount = 1;
					this.addDrawer(drawer);
				},
				(error) => {
					console.error('Error inserting item in drawer:', error);
				}
			);
	}

	ngOnInit() {
		this.itemService
			.getItems()
			.subscribe((items: Item[]) => {
				this.existingItems = items;
			});
		this.itemTagService
			.getItemTags()
			.subscribe((tags: ItemTag[]) => {
				this.existingTags = tags;
			});
		this.drawerService
			.getDrawers()
			.subscribe((drawers: Drawer[]) => {
				if (drawers.length == 0) {
					const ROWS: number = 7;
					const COLUMNS: number = 7;
					for (let y = 0; y < ROWS; y++) {
						for (let x = 0; x < COLUMNS; x++) {
							this.drawerService
								.createDrawer(
									x,
									y,
									0,
									0
								)
								.subscribe(
									(drawer: Drawer) => this.addDrawer(drawer),
									(error) =>
										console.error(
											'Error creating drawer:',
											error
										)
								);
						}
					}
				} else {
					this.addDrawers(drawers);
				}
			});
	}

	addDrawers(drawers: Drawer[]) {
		for (let drawer of drawers) this.addDrawer(drawer);
	}
	addDrawer(drawer: Drawer) {
		let rowsToAdd = 1 + drawer.y - this.rows.length;
		for (let i = 0; i < rowsToAdd; i++) this.rows.push([]);

		let columnsToAdd = 1 + drawer.x - this.rows[drawer.y].length;
		for (let i = 0; i < columnsToAdd; i++)
			this.rows[drawer.y].push({
				id: 0,
				itemId: 0,
				itemCount: 0,
				x: this.rows[drawer.y].length,
				y: drawer.y,
			});

		this.rows[drawer.y][drawer.x] = drawer;
	}
}
