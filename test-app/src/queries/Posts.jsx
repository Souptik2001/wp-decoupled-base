import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts($limit: Int, $postType: String!, $offset: Int!, $taxonomy: String, $term: Int) {
		posts(limit: $limit, postType: $postType, offset: $offset, taxonomy: $taxonomy, term: $term) {
			pageInfo {
				endCursor
				hasNextPage
				totalPages
			}
			posts {
				type
				excerpt {
					rendered
				}
				date
				slug
				title {
					rendered
				}
			}
		}
	}
`;