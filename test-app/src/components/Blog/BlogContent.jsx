import { useMemo } from "react";

function BlogContent({blogData}) {

	const dateString = useMemo(() => {
		var dateObject = new Date(blogData.date);
		var year = dateObject.getFullYear();
		var date = dateObject.getDate();
		var month = dateObject.getMonth();
		return `${date}/${month}/${year}`;
	}, [blogData.date]);

	return (
		<div>
			<h1>{blogData.title.rendered}</h1>
			<em>Written by <strong>{blogData.author.name}</strong> on <strong>{dateString}</strong></em>
			<div
				dangerouslySetInnerHTML={{__html: blogData.content.rendered}}
			/>
		</div>
	)

}

export default BlogContent;