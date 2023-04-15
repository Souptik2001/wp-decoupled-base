import { useQuery } from "@apollo/client";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_POST } from "../../queries/Post";
import { PostStoreContext } from "../BlogListRoutes";
import Loading from "../Loading";
import PageNotFound from "../PageNotFound";
import BlogContent from "./BlogContent";

function Blog() {
	const {slug} = useParams();
	const {postTypeData} = useContext(PostStoreContext);
	const {data, loading} = useQuery(
		GET_POST,
		{
			variables: {
				slug,
				postType: postTypeData?.rest_base
			}
		}
	);

	useEffect(() => {
		if (data && data.post) {
			document.title = data.post.title.rendered;
		}
	}, [data]);

	return (
		<div data-testid="single-post">
			{
				loading
				&&
				(<Loading />)
			}
			{
				! loading
				&&
				data?.post
				&&
				(<BlogContent blogData={data?.post} />)
			}
			{
				! loading
				&&
				! data?.post
				&&
				(<PageNotFound />)
			}
		</div>
	);
}

export default Blog;