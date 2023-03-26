import { useEffect } from "react";
import { useParams } from "react-router-dom";

function BlogList() {
	const {postType="", taxonomy="", slug=""} = useParams();

	useEffect(() => {
		document.title = `${postType} | ${taxonomy} | ${slug}`;
	})

	return (
		<div>
			Blog List
		</div>
	)
}

export default BlogList;