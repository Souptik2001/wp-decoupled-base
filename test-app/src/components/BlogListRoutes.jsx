import { useQuery } from "@apollo/client";
import { createContext, useReducer } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { GET_POST_TYPE } from "../queries/PostType";
import Blog from "./Blog/Blog";
import BlogList from "./BlogList/BlogList";
import Filters from "./BlogList/Filters";
import PageNotFound from "./PageNotFound";

export const PostStoreContext = createContext();

function updatePosts(state, action) {
	const {taxonomy, term, postType, page, total, termID} = action;

	if ( ! state[postType] ) {
		state[postType] = {};
	}

	if ( taxonomy && ! state[postType][taxonomy] ) {
		state[postType][taxonomy] = {};
	}

	if ( taxonomy && term ) {
		if ( ! state[postType][taxonomy][term] ) {
			state[postType][taxonomy][term] = {};
		}
		state[postType][taxonomy][term]['currentPage'] = page ? page : state[postType][taxonomy][term]['currentPage'];
		state[postType][taxonomy][term]['totalPages'] = total ? total : state[postType][taxonomy][term]['totalPages'];
		state[postType][taxonomy][term]['id'] = termID ? termID : state[postType][taxonomy][term]['id'];
	} else {
		state[postType]['no filter'] = {
			currentPage: page,
			totalPages: total
		}
	}

	return {...state};
}

function BlogListRoutes() {

	const {postType=""} = useParams();

	const [posts, setPosts] = useReducer(updatePosts, {});

	const {data, loading} = useQuery(
		GET_POST_TYPE,
		{
			variables: {
				type: postType
			}
		}
	);

	if (loading) {
		return(
			<h1>Loading...</h1>
		)
	}

	const postStore = {
		posts,
		setPosts,
		postTypeData: data?.postType
	};

	return (
		<div>
			{
				! loading
				&&
				data?.postType
				&&
				<PostStoreContext.Provider value={postStore}>
					<Routes>
						<Route element={<Filters />}>
							<Route path=":page?" element={<BlogList />}  />
							<Route path='filter/:taxonomy/:term/:page?' element={<BlogList />} />
							<Route path=':year/:month/:date/:slug' element={<Blog />} />
						</Route>
					</Routes>
				</PostStoreContext.Provider>
			}
			{
				! loading
				&&
				! data?.postType
				&&
				(<PageNotFound />)
			}
		</div>
	)

}

export default BlogListRoutes;
