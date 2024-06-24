import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Drawer, Item } from '../../types';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
	constructor(private api: ApiService) {}

	url: string = ApiService.BASE_URL + "drawers/";

	getDrawers = (): Observable<Drawer[]> => {
		return this.api.get(this.url, { responseType: 'json' });
	};

	deleteDrawer = (): Observable<Drawer> => {
		return this.api.delete(this.url, { responseType: 'json' });
	};

	updateDrawer = (drawer: Drawer, item: Item): Observable<Drawer> => {
		let headers = new HttpHeaders();
		headers = headers.set(
			"Content-Type",
			"application/json; charset=utf-8"
		);
		return this.api.patch(this.url + drawer.id, '{ "itemId": ' + item.id + ', "itemCount": 1 }', {
			headers,
			responseType: 'json',
		});
	};

	createDrawer = (x: number, y: number, itemId: number, itemCount: number): Observable<Drawer> => {
		let headers = new HttpHeaders();
		headers = headers.set(
			"Content-Type",
			"application/json; charset=utf-8"
		);
		return this.api.post(this.url, '{ "x": ' + x + ', "y": ' + y + ', "itemId": ' + itemId + ', "itemCount": ' + itemCount + ' }', {
			headers,
			responseType: 'json',
		});
	};
}
