import { useApolloClient, useMutation } from "@apollo/client";
import { useContext, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { UPDATE_POST_META } from "../../mutations/PostMeta";
import { GET_POST } from "../../queries/Post";
import { PostStoreContext } from "../BlogListRoutes";

function BlogContent({blogData}) {

	const client = useApolloClient();

	const {slug} = useParams();
	const {postTypeData} = useContext(PostStoreContext);

	const dateString = useMemo(() => {
		var dateObject = new Date(blogData?.date);
		var year = dateObject.getFullYear();
		var date = dateObject.getDate();
		var month = dateObject.getMonth();
		return `${date}/${month}/${year}`;
	}, [blogData?.date]);

	var [increasePostViews] = useMutation(
		UPDATE_POST_META,
		{
			variables: {
				postType: postTypeData?.rest_base,
				postID: blogData?.id,
				metaInput: [{
					meta_key: 'post_views',
					meta_value: blogData?.meta?.post_views + 1
				}]
			}
		}
	);

	// This is executing twice because of React strict mode. Because of this when running on development mode it is running twice.
	useEffect(() => {
		increasePostViews();
		client.cache.updateQuery({
			query: GET_POST,
			variables: {
				slug,
				postType: postTypeData?.rest_base
			}
		},
		(data) => {
			var updatedCache = {...data};
			if ( data?.post?.meta?.post_views !== null && data?.post?.meta?.post_views !== undefined ) {
				updatedCache = {
					post: {
						...updatedCache?.post,
						meta: {
							...updatedCache?.post?.meta,
							post_views: data?.post?.meta?.post_views + 1
						}
					}
				}
			}
			return updatedCache;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div data-testid="single-post-content">
			<h1>{blogData?.title?.rendered}</h1>
			<em>Written by <strong>{blogData?.author?.name}</strong> on <strong>{dateString}</strong></em>
			<br />
			<em>Views: <strong>{blogData?.meta?.post_views}</strong></em>
			<div
				dangerouslySetInnerHTML={{__html: blogData?.content?.rendered}}
			/>
		</div>
	)

}

export default BlogContent;