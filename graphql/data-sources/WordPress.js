
import { RESTDataSource } from "@apollo/datasource-rest";

export class WordPress extends RESTDataSource {

	constructor ({url}) {
		super();

		this.baseURL = url;
	}

	async fetchMenu(menuIDOrSlug) {
		var menus = await this.get( "menus/v1/menus/" + menuIDOrSlug );
		return menus;
	}

	async fetchPosts({postType, queryParams}) {

		var posts = await this.get( `wp/v2/${postType}`, {
			params: queryParams
		} );

		return posts;

	}
}
