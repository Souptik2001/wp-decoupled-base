import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_POST } from "../queries/Post";
import BlogContent from "./Blog/BlogContent";
import PageNotFound from "./PageNotFound";

function Blog() {
	const {slug, postType} = useParams();
	const {data, loading} = useQuery(
		GET_POST,
		{
			variables: {
				slug,
				postType
			}
		}
	);

	useEffect(() => {
		if (data && data.post) {
			document.title = data.post.title.rendered;
		}
	}, [data]);

	return (
		<div>
			{
				loading
				&&
				(<h1>Loading...</h1>)
			}
			{
				! loading
				&&
				data.post
				&&
				(<BlogContent blogData={data.post} />)

			}
			{
				! loading
				&&
				! data.post
				&&
				(<PageNotFound />)
			}
		</div>
	);
}

export default Blog;