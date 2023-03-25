import MenuItem from './MenuItem';

function Menu({menu}) {

	return (
		<ul className='menu'>
			{
				menu &&
				menu.menu.items &&
				menu.menu.items.map((val) =>
					<MenuItem key={val.menu_order} menu={val} />
				)
			}
		</ul>
	);

}

export default Menu;