import { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "./Blog";
import BlogList from "./BlogList";

export const PostStoreContext = createContext();

function updatePosts(state, action) {
	const {taxonomy, term, postType, page, total} = action;

	if ( ! state[postType] ) {
		state[postType] = {};
	}

	if ( ! taxonomy && ! state[postType][taxonomy] ) {
		state[postType][taxonomy] = {};
	}

	if ( taxonomy && term ) {
		state[postType][taxonomy][term] = {
			currentPage: page,
			totalPages: total
		}
	} else {
		state[postType]['na'] = {
			currentPage: page,
			totalPages: total
		}
	}

	return state;
}

function BlogListRoutes() {

	const [posts, setPosts] = useReducer(updatePosts, {});

	const postStore = {
		posts,
		setPosts
	};

	return (
		<PostStoreContext.Provider value={postStore}>
			<Routes>
				<Route index element={<BlogList />}  />
				<Route path=':taxonomy/:slug' element={<BlogList />} />
				<Route path=':year/:month/:date/:slug' element={<Blog />} />
			</Routes>
		</PostStoreContext.Provider>
	)

}

export default BlogListRoutes;
