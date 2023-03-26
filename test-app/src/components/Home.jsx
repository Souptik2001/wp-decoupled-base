import { Link } from "react-router-dom";

function Home() {

	return (
		<>
		<h1>👋</h1>
		<Link to='/posts'>Filter Posts</Link>
		</>
	);

}

export default Home;