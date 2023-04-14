
export const resolvers = {
	Query: {
		posts: postsResolver,
		menu: menuResolver,
		post: postResolver,
		taxonomies: taxonomiesResolver,
		terms: termsResolver,
		postType: postTypeResolver
	},
	Mutation: {
		updatePostMeta: updatePostMetaResolver,
	},
	PostReturn: {
		pageInfo: postPageInfoResolver,
	},
	Post: {
		author: userResolver,
	}
};

async function updatePostMetaResolver(parent, args, {dataSources}) {

	const {postType, postID, metaInput} = args;

	const metaInputFormatted = {};

	metaInput.forEach(element => {
		metaInputFormatted[element.meta_key] = element.meta_value;
	});

	try {
		const data = await dataSources.wp.updatePostMeta({
			postType,
			postID,
			metaInput: metaInputFormatted
		});

		return {
			success: true,
			data: data['response']
		};
	} catch {
		return {
			success: false,
			data: null
		}
	}
}

async function postTypeResolver(parent, args, {dataSources}) {

	const {postType} = args;

	if ( ! postType ) {
		return null;
	}

	var postTypeDetails = await dataSources.wp.fetchPostType({
		postType
	});

	return postTypeDetails;

}

async function termsResolver(parent, args, {dataSources}) {

	const {taxonomy, restNamespace, page=1, perPage=10} = args;

	var terms = await dataSources.wp.fetchTerms({
		taxonomy,
		restNamespace,
		page,
		perPage
	});

	return terms['response'];

}

async function taxonomiesResolver(parent, args, {dataSources}) {

	const {postType} = args;

	var taxonomies = await dataSources.wp.fetchTaxonomies(postType);

	return Object.values( taxonomies['response'] );

}

async function userResolver(parent, args, {dataSources}) {

	var author = await dataSources.wp.fetchUser(parent.author);

	return author['response'];

}

async function postResolver(parent, args, {dataSources}) {

	var {slug, postType} = args;

	if ( slug && slug !== "" ) {
		try {
			var post = await dataSources.wp.fetchPost({
				postType: postType,
				slug
			});

			return post['response'];
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	return null;

}

function postPageInfoResolver(parent, args) {
	var endCursor = null;
	if(parent.posts.length > 0) {
		endCursor = Buffer.from( parent.posts[parent.posts.length-1].date ).toString("base64");
	}
	return {
		endCursor,
		hasNextPage: parent.hasNextPage,
		totalPages: parent.totalPages
	}
}

async function postsResolver(parent, args, {dataSources}) {
	const {postType, limit=10, offset, after, taxonomy, term=0} = args;
	var queryParams = {};
	if(limit) {
		queryParams['per_page'] = (limit+1).toString();
	}
	if(after) {
		var beforeDate = Buffer.from(after, 'base64').toString();
		queryParams['before'] = beforeDate;
	} else if(offset) {
		queryParams['offset'] = offset.toString();
	}

	if (taxonomy && taxonomy !== "") {
		queryParams[ taxonomy ] = term;
	}

	try {
		var posts = await dataSources.wp.fetchPosts({
			queryParams,
			postType,
		});
		var totalPosts = posts['meta']['totalPosts'];
		var totalPages = Math.ceil( totalPosts / limit );
		posts = posts['response'];
		// Edge case to handle if REST API of WordPress is not activated.
		if ( ! Array.isArray(posts) ) {
			return null;
		}
		var hasNextPage = posts.length >= limit+1
		if(hasNextPage) {
			posts.pop();
		}
		var returnData = {
			posts,
			hasNextPage,
			totalPages
		}
		return returnData;
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function menuResolver(parent, args, {dataSources}) {
	const {id, slug} = args;

	var menuIDOrSlug = null;

	if (id !== undefined) {
		menuIDOrSlug = id;
	} else if(slug) {
		menuIDOrSlug = slug;
	}

	if(menuIDOrSlug == null) {
		return null;
	}

	try {
		var menus = await dataSources.wp.fetchMenu(menuIDOrSlug);
		return menus['response'];
	} catch (error) {
		console.log(error);
		return null;
	}

}
