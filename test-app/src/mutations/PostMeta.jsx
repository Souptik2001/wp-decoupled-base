import { gql } from "@apollo/client";

export const UPDATE_POST_META = gql`
	mutation UpdatePostMeta($postType: String!, $postID: Int!, $metaInput: [MetaInput!]!) {
		updatePostMeta(postType: $postType, postID: $postID, metaInput: $metaInput) {
			success
		}
	}
`;
