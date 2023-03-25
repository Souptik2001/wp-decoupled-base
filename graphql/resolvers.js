import axios from "axios";

export const resolvers = {
	Query: {
		posts: postsResolver,
		menu: menuResolver,
	},
	PostReturn: {
		pageInfo: postPageInfoResolver,
	}
};

function postPageInfoResolver(parent, args) {
	var endCursor = null;
	if(parent.posts.length > 0) {
		endCursor = Buffer.from( parent.posts[parent.posts.length-1].date ).toString("base64");
	}
	return {
		endCursor,
		hasNextPage: parent.hasNextPage
	}
}

async function postsResolver(parent, args) {
	const {limit=10, offset, after} = args;
	var queryParams = {};
	if(limit) {
		queryParams['per_page'] = limit+1;
	}
	if(after) {
		var beforeDate = Buffer.from(after, 'base64').toString();
		queryParams['before'] = beforeDate;
	} else if(offset) {
		queryParams['offset'] = offset;
	}

	var queryParamsString = new URLSearchParams(queryParams).toString();
	try {
		var posts = await axios.get( `http://test.lndo.site/wp-json/wp/v2/posts?${queryParamsString}` );
		var postsData = posts.data;
		var hasNextPage = postsData.length >= limit+1
		if(hasNextPage) {
			postsData.pop();
		}
		var returnData = {
			posts: postsData,
			hasNextPage
		}
		return returnData;
	} catch (error) {
		// What should be ideally returned here?
		return null;
	}
}

async function menuResolver(parent, args) {
	const {id, slug} = args;

	var menuIDOrSlug = '';

	if (id !== undefined) {
		menuIDOrSlug = id;
	} else if(slug) {
		menuIDOrSlug = slug;
	}

	try {
		var menus = await axios.get( "http://test.lndo.site/wp-json/menus/v1/menus/primary" );
		return menus.data;
	} catch (error) {
		// What should be ideally returned here?
		return null;
	}

}
