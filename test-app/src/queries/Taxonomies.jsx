import { gql } from "@apollo/client";

export const GET_TAXONOMIES = gql`
	query GetTaxonomies($postType: String!) {
		taxonomies(postType: $postType) {
			description
			name
			hierarchical
			rest_base
			rest_namespace
			slug
		}
	}
`;