import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import "../Navbar.css";
import { GET_NAVBAR } from "../queries/Navbar";
import Menu from "./Navbar/Menu";


function Navbar() {
	const {data, loading, error} = useQuery(
		GET_NAVBAR,
		{
			variables: {
				slug: 'nav-bar'
			}
		}
	);

	return (
		<nav className="Navbar">
			<Link to="/">Logo</Link>
			<Menu menu={data}/>
		</nav>
	);

}

export default Navbar;
