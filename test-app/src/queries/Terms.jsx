import { gql } from "@apollo/client";

export const GET_TERMS = gql`
	query GetTerms($taxonomy: String!, $restNamespace: String!, $page: Int) {
		terms(taxonomy: $taxonomy, restNamespace: $restNamespace, page: $page) {
			count
			description
			id
			name
			parent
			slug
			taxonomy
		}
}
`;