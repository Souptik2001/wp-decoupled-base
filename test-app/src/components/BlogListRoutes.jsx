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

	const postStore = {
		posts,
		setPosts
	};

	return (
		<PostStoreContext.Provider value={postStore}>
			<Routes>
				<Route element={<Filters postType={postType} />}>
					<Route path=":page?" element={<BlogList />}  />
					<Route path='filter/:taxonomy/:term/:page?' element={<BlogList />} />
					<Route path=':year/:month/:date/:slug' element={<Blog />} />
				</Route>
			</Routes>
		</PostStoreContext.Provider>
	)

}

export default BlogListRoutes;
