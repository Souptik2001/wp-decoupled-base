import { useEffect } from "react";

function PageNotFound() {

	useEffect(() => {
		document.title = "Page Not Found";
	}, []);

	return (
		<h1>
			Page Not Found | 404
		</h1>
	)

}

export default PageNotFound;