import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ItemTag } from '../../types';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class ItemTagService {
	constructor(private api: ApiService) {}

	url: string = ApiService.BASE_URL + "item-tags/";

	getItemTags = (): Observable<ItemTag[]> => {
		return this.api.get(this.url, { responseType: 'json' });
	};

	deleteItemTag = (itemTag: ItemTag): Observable<ItemTag> => {
		return this.api.delete(this.url + itemTag.id, { responseType: 'json' });
	};

	createItemTag = (tagLabel: string): Observable<ItemTag> => {
		let headers = new HttpHeaders();
		headers = headers.set(
			'Content-Type',
			'application/json; charset=utf-8'
		);
		return this.api.post(this.url, '{ "label": "' + tagLabel + '" }', {
			headers,
			responseType: 'json',
		});
	};
}
