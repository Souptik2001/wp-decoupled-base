import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../assets/css/BlogList.css';
import '../assets/css/Navigation.css';
import { GET_POSTS } from "../queries/Posts";
import BlogListCard from "./BlogList/BlogListCard";
import { PostStoreContext } from "./BlogListRoutes";

function BlogList() {
	const {taxonomy="", term="", page=1} = useParams();
	const pageNumber = parseInt(page);

	const {posts, setPosts, postTypeData} = useContext(PostStoreContext);

	const postType = postTypeData?.slug;

	const {data, loading} = useQuery(
		GET_POSTS,
		{
			variables: {
				limit: 10,
				postType: postTypeData?.rest_base,
				offset: Math.max(pageNumber-1, 0)*10,
				taxonomy: taxonomy,
				term: ( posts[postType] && posts[postType][taxonomy] && posts[postType][taxonomy][term] ) ? posts[postType][taxonomy][term]['id'] : 0
			},
		}
	);

	useEffect(() => {
		document.title = ( taxonomy && term ) ? `${postTypeData?.name} | ${taxonomy} | ${term}` : postTypeData?.name;
		setPosts({
			taxonomy,
			postType,
			term,
			page
		});
	}, [postType, postTypeData, taxonomy, term, page, setPosts]);

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
							data?.posts?.pageInfo?.hasNextPage
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