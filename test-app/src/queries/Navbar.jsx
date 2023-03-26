import { gql } from "@apollo/client";

export const GET_NAVBAR = gql`
	query GetMenus($slug: String) {
		menu(slug: $slug) {
			slug
			name
			term_id
			items {
				ID
				menu_order
				menu_item_parent
				title
				url
				type
				object
				child_items {
					ID
					menu_order
					menu_item_parent
					title
					url
					type
					object
				}
			}
		}
	}
`;
