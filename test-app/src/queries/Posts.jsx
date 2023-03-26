import { gql } from "@apollo/client";

export const GET_POSTS = gql`
	query GetPosts($limit: Int, $postType: String!, $offset: Int, $after: String) {
		posts(limit: $limit, postType: $postType, offset: $offset, after: $after) {
			pageInfo {
				endCursor
				hasNextPage
			}
			posts {
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