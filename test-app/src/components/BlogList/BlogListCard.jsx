import { Link } from "react-router-dom";

function BlogListCard({blogData}) {

	return (
		<Link>
			<h2>{blogData.title.rendered}</h2>
			<div
				dangerouslySetInnerHTML={{
					__html: blogData.excerpt.rendered
				}}
			/>
		</Link>
	)

}

export default BlogListCard;