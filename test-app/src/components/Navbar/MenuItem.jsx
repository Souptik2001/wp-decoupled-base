import { useCallback, useRef } from "react";
import { Link } from 'react-router-dom';
import Submenu from "./Submenu";

function MenuItem({menu}) {

	const submenu = useRef(null);

	const changeSubMenuSate = useCallback((visible) => {
		if ( submenu.current ) {
			if (visible) {
				submenu.current.classList.add("is-visible");
			} else {
				submenu.current.classList.remove("is-visible");
			}
		}
	}, []);

	return (
		<li className="menu-item" onMouseEnter={() => {changeSubMenuSate(true)}} onMouseLeave={() => {changeSubMenuSate(false)}}>
			<Link to={menu.url} className={(menu.child_items && menu.child_items.length > 0) ? "has-child-menu" : ""}>{menu.title}</Link>
			{
				menu.child_items
				&&
				menu.child_items.length > 0
				&&
				<Submenu ref={submenu} submenu={menu.child_items} />
			}
		</li>
	)

}

export default MenuItem;