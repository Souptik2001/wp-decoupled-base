import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../BlogList.css';
import '../Navigation.css';
import { GET_POSTS } from "../queries/Posts";
import BlogListCard from "./BlogList/BlogListCard";
import { PostStoreContext } from "./BlogListRoutes";

function BlogList() {
	const {postType="", taxonomy="", term="", page=1} = useParams();
	const pageNumber = parseInt(page);

	const {posts, setPosts} = useContext(PostStoreContext);

	const {data, loading} = useQuery(
		GET_POSTS,
		{
			variables: {
				limit: 10,
				postType: postType,
				offset: Math.max(pageNumber-1, 0)*10,
			}
		}
	);

	useEffect(() => {
		document.title = `${postType} | ${taxonomy} | ${term}`;
	}, [postType, taxonomy, term]);

	var navigationLink = `/${postType}`;

	if (taxonomy && term) {
		navigationLink += `/filter/${taxonomy}/${term}`;
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
				data?.posts?.pageInfo
				&&
				(
					<div className="navigation">
						<Link to={`${navigationLink}/${Math.max(pageNumber-1, 1) <= 1 ? '' : Math.max(pageNumber-1, 1)}`}>Prev</Link>
						{
							pageNumber-1 > 0
							&&
							<Link to={`${navigationLink}/${pageNumber-1}`}>{pageNumber-1}</Link>
						}
						<Link className="is-active" to={`${navigationLink}/${pageNumber}`}>{pageNumber}</Link>
						{
							pageNumber+1 <= data?.posts?.pageInfo?.totalPages+1
							&&
							<Link to={`${navigationLink}/${pageNumber+1}`}>{pageNumber+1}</Link>
						}
						<Link to={`${navigationLink}/${Math.min(pageNumber+1, data?.posts?.pageInfo?.totalPages+1)}`}>Next</Link>
					</div>
				)
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
						<BlogListCard key={val.slug} blogData={val} postType={postType} />
					);
				})
			}
		</div>
	)
}

export default BlogList;