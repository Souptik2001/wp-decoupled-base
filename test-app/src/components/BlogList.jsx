import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_POSTS } from "../queries/Posts";
import BlogListCard from "./BlogList/BlogListCard";
import { PostStoreContext } from "./BlogListRoutes";

function BlogList() {
	const {postType="", taxonomy="", term="", page=0} = useParams();
	const pageNumber = parseInt(page);

	const {posts, setPosts} = useContext(PostStoreContext);

	const {data, loading} = useQuery(
		GET_POSTS,
		{
			variables: {
				limit: 10,
				postType: postType,
				offset: pageNumber*10,
			}
		}
	);

	useEffect(() => {
		document.title = `${postType} | ${taxonomy} | ${term}`;
	}, [postType, taxonomy, term]);

	var navigationLink = `/${postType}/filter`;

	if (taxonomy && term) {
		navigationLink += `/${taxonomy}/${term}`;
	}

	return (
		<div>
			{
				loading
				&&
				<h1>Loading...</h1>
			}
			{
				! loading
				&&
				data?.posts
				&&
				data?.posts?.posts.length > 0
				&&
				data?.posts?.posts.map((val) => {
					return (
						<BlogListCard key={val.slug} blogData={val} />
					);
				})
			}
			{
				! loading
				&&
				data?.posts?.pageInfo
				&&
				(
					<div>
						<Link to={`${navigationLink}/${Math.max(pageNumber-1, 0)}`}>Prev</Link>
						<Link to={`${navigationLink}/${Math.min(pageNumber+1, data?.posts?.pageInfo?.totalPages)}`}>Next</Link>
					</div>
				)
			}
		</div>
	)
}

export default BlogList;