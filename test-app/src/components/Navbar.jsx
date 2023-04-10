import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import "../assets/css/Navbar.css";
import { GET_NAVBAR } from "../queries/Navbar";
import Menu from "./Navbar/Menu";


function Navbar() {
	const {data} = useQuery(
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
			{
				data
				&&
				<Menu menu={data}/>
			}
		</nav>
	);

}

export default Navbar;
