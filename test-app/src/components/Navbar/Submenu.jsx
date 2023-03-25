import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Submenu = forwardRef(({submenu}, ref) => {

	return (
		<ul className="submenu" ref={ref}>
			{
				submenu &&
				submenu.map((val) => {
					return (
						<li key={val['menu_order']} className={(val.child_items && val.child_items.length > 0) ? "has-child-menu menu-item" : "menu-item"}>
							<Link to={val.url}>{val.title}</Link>
							{
								val.child_items
								&&
								val.child_items.length > 0
								&&
								<Submenu submenu={val.child_items} />
							}
						</li>
					)
				})
			}
		</ul>
	)

});

export default Submenu;