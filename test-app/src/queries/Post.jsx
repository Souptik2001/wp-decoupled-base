import { gql } from "@apollo/client";

export const GET_POST = gql`
	query GetPost($postType: String!, $slug: String!) {
		post(postType: $postType, slug: $slug) {
			title {
				rendered
			}
			slug
			id
			date
			content {
				rendered
			}
			author {
				id
				name
				slug
				link
			}
			meta {
				post_views
			}
		}
	}
`;
