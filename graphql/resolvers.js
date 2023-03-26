
export const resolvers = {
	Query: {
		posts: postsResolver,
		menu: menuResolver,
		post: postResolver
	},
	PostReturn: {
		pageInfo: postPageInfoResolver,
	},
	Post: {
		author: userResolver,
	}
};

async function userResolver(parent, args, {dataSources}) {

	var author = await dataSources.wp.fetchUser(parent.author);

	return author;

}

async function postResolver(parent, args, {dataSources}) {

	var slug = args.slug;
	var postType = args.postType;

	if ( slug && slug !== "" ) {
		try {
			var post = await dataSources.wp.fetchPost({
				postType: postType,
				slug
			});

			return post;
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
		hasNextPage: parent.hasNextPage
	}
}

async function postsResolver(parent, args, {dataSources}) {
	const {limit=10, offset, after} = args;
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

	try {
		var posts = await dataSources.wp.fetchPosts({
			queryParams,
			postType: 'posts',
		});
		var hasNextPage = posts.length >= limit+1
		if(hasNextPage) {
			posts.pop();
		}
		var returnData = {
			posts,
			hasNextPage
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
		return menus;
	} catch (error) {
		console.log(error);
		return null;
	}

}
