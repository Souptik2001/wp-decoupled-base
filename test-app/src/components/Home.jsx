import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

	useEffect(() => {
		document.title = "WP Decoupled";
	}, []);

	return (
		<>
		<h1>👋</h1>
		<Link to='/blog'>See Blogs</Link>
		</>
	);

}

export default Home;