import { gql } from "@apollo/client";

export const UPDATE_POST_META = gql`
	mutation UpdatePostMeta($postID: Int, $metaInput: [MetaInput!]!) {
		updatePostMeta(postID: $postID, metaInput: $metaInput) {
			success
		}
	}
`;
