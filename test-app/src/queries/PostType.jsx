import { gql } from "@apollo/client";

export const GET_POST_TYPE = gql`
query GetPostType($type: String!) {
	postType(postType: $type) {
	  description
	  name
	  rest_base
	  rest_namespace
	  slug
	}
  }
`;