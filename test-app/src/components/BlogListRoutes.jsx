import { createContext, useReducer } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Blog from "./Blog";
import BlogList from "./BlogList";
import Filters from "./BlogList/Filters";

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
		state[postType][taxonomy][term] = {
			currentPage: page,
			totalPages: total,
			id: termID
		}
	} else {
		state[postType]['na'] = {
			currentPage: page,
			totalPages: total
		}
	}

	return {...state};
}

function BlogListRoutes() {

	const {postType=""} = useParams();

	const [posts, setPosts] = useReducer(updatePosts, {});

	const postStore = {
		posts,
		setPosts
	};

	return (
		<PostStoreContext.Provider value={postStore}>
			<Filters postType={postType} />
			<Routes>
				<Route path=":page?" element={<BlogList />}  />
				<Route path='filter/:taxonomy/:term/:page?' element={<BlogList />} />
				<Route path=':year/:month/:date/:slug' element={<Blog />} />
			</Routes>
		</PostStoreContext.Provider>
	)

}

export default BlogListRoutes;
