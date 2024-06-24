import { Routes } from '@angular/router';
import { DrawersComponent } from './section/drawers/drawers.component';
import { ItemsComponent } from './section/items/items.component';
import { TagsComponent } from './section/tags/tags.component';

export const routes: Routes = [
    {
        path: "",
        component: DrawersComponent
    },
    {
        path: "drawers",
        component: DrawersComponent
    },
    {
        path: "items",
        component: ItemsComponent
    },
    {
        path: "tags",
        component: TagsComponent
    }
];
