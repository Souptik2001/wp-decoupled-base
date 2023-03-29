import { useMemo } from "react";
import { Link } from "react-router-dom";

function BlogListCard({blogData, postType}) {

	const blogLink = useMemo(() => {
		var dateObject = new Date(blogData?.date);
		var year = dateObject.getFullYear();
		var date = dateObject.getDate();
		var month = dateObject.getMonth();
		return `/${postType}/${year}/${month}/${date}/${blogData?.slug}`;
	}, [blogData, postType]);

	return (
		<div className="blog-list-card">
			<Link to={blogLink}>
				<h2>{blogData?.title?.rendered}</h2>
				<div
					dangerouslySetInnerHTML={{
						__html: blogData?.excerpt?.rendered
					}}
				/>
			</Link>
		</div>
	)

}

export default BlogListCard;