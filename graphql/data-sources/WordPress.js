
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

	async fetchPost({postType, slug}) {

		var post = await this.get( `wp/v2/${postType}`, {
			params: {
				slug
			}
		} );

		if ( post.length < 1 ) {
			return null;
		}

		return {
			result: post['result'][0]
		};

	}

	async fetchUser(id) {

		var author = await this.get( `wp/v2/users/${id}` );

		return author;

	}

	async parseBody(response) {
		var responseBody = {};
		const contentType = response.headers.get('Content-Type');
		const contentLength = response.headers.get('Content-Length');
		if (
		  response.status !== 204 &&
		  contentLength !== '0' &&
		  contentType &&
		  (contentType.startsWith('application/json') ||
			contentType.endsWith('+json'))
		) {
		  responseBody['result'] = await response.json();
		} else {
			responseBody['result'] = await response.text();
		}
		const totalPages = response.headers.get('X-WP-TotalPages');

		responseBody['totalPages'] = totalPages;

		return responseBody;
	  }
}
