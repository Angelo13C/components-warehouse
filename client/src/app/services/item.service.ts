import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Item } from '../../types';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class ItemService {
	constructor(private api: ApiService) {}

	url: string = ApiService.BASE_URL + "items/";

	getItems = (): Observable<Item[]> => {
		return this.api.get(this.url, { responseType: 'json' });
	};

	deleteItem = (item: Item): Observable<Item> => {
		return this.api.delete(this.url + item.id, { responseType: 'json' });
	};

	createItem = (tagsIds: number[]): Observable<Item> => {
		let headers = new HttpHeaders();
		headers = headers.set(
			'Content-Type',
			'application/json; charset=utf-8'
		);
		return this.api.post(this.url, '{ "tagsIds": [' + tagsIds.join(",") + '] }', {
			headers,
			responseType: 'json',
		});
	};
}
