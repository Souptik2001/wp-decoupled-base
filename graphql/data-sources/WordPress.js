
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
			response: post['response'][0]
		};

	}

	async fetchUser(id) {

		var author = await this.get( `wp/v2/users/${id}` );

		return author;

	}

	async fetchTaxonomies(postType) {

		var taxonomies = await this.get(
			`wp/v2/taxonomies`,
			{
				params: {
					type: postType
				}
			}
		);

		return taxonomies;

	}

	async fetchTerms({taxonomy, restNamespace, page, perPage}) {

		var terms = await this.get(
			`${restNamespace}/${taxonomy}`,
			{
				params: {
					per_page: perPage,
					page
				}
			}
		);

		return terms;

	}

	async fetchPostType({postType}) {

		var typeDetails = await this.get(
			`wp/v2/types/${postType}`,
		);

		return typeDetails['response'];

	}

	async parseBody(response) {
		var responseBody = {
			'meta': {}
		};
		const contentType = response.headers.get('Content-Type');
		const contentLength = response.headers.get('Content-Length');
		if (
		  response.status !== 204 &&
		  contentLength !== '0' &&
		  contentType &&
		  (contentType.startsWith('application/json') ||
			contentType.endsWith('+json'))
		) {
		  responseBody['response'] = await response.json();
		} else {
			responseBody['response'] = await response.text();
		}
		const totalPages = response.headers.get('X-WP-TotalPages');

		responseBody['meta']['totalPages'] = totalPages;

		return responseBody;
	}

}
