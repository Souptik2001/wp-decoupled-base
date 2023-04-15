import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import '../../assets/css/BlogList.css';
import '../../assets/css/Navigation.css';
import { GET_POSTS } from "../../queries/Posts";
import { PostStoreContext } from "../BlogListRoutes";
import PageNotFound from "../PageNotFound";
import BlogListCard from "./BlogListCard";

function BlogList() {
	const {taxonomy="", term="", page=1} = useParams();
	const pageNumber = parseInt(page);

	const {posts, setPosts, postTypeData} = useContext(PostStoreContext);

	const postType = postTypeData?.slug;

	const {data, loading, error} = useQuery(
		GET_POSTS,
		{
			// TODO: Implement lazy query to handle this situation where the posttype null is also send as request resulting in redundant requests.
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

	if ( error ) {
		return (
			<h1>Error fetching data.</h1>
		)
	}

	return (
		<div>
			{
				loading
				&&
				<h1>Loading...</h1>
			}
			{
				data?.posts
				&&
				data?.posts?.posts.length <= 0
				&&
				(
					<>
						<PageNotFound />
						<em>Back to <Link to={navigationLink}>First Page</Link></em>
					</>
				)
			}
			{
				! loading
				&&
				data?.posts?.pageInfo
				&&
				data?.posts?.posts.length > 0
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
						<Link to={`${navigationLink}/${Math.min(pageNumber+1, data?.posts?.pageInfo?.totalPages)}`}>Next</Link>
					</div>
				)
			}
			{
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