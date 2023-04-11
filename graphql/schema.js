export const typeDefs = `#graphql
  interface ReturnDataFormat {
    pageInfo: PageInfo
  }

  interface MutationReturnDataFormat {
    success: Boolean
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
    totalPages: Int
  }

  type PostMeta {
    post_views: Int
  }

  type Post {
	  id: Int!
	  slug: String!
    title: Title
	  content: Content
    author: User
    date: String
    type: String
    excerpt: Excerpt
    meta: PostMeta
  }

  type User {
    id: Int!
    name: String
    slug: String
    link: String
  }

  type Content {
    rendered: String
    protected: Boolean
  }

  type Excerpt {
    rendered: String
  }

  type Title {
	  rendered: String
  }

  type PostReturn implements ReturnDataFormat {
    posts: [Post]
    pageInfo: PageInfo
  }

  type MenuItem {
    ID: Int
    type: String
    object: String
    menu_item_parent: Int
    menu_order: Int
    url: String
    title: String
    child_items: [MenuItem]
  }

  type Menu {
    term_id: Int
    name: String
    slug: String
    items: [MenuItem]
  }

  type Taxonomy {
    name: String
    slug: String!
    description: String
    hierarchical: Boolean
    rest_base: String
    rest_namespace: String
  }

  type Term {
    id: Int!
    count: Int
    description: String
    name: String
    slug: String
    taxonomy: String
    parent: Int
  }

  type PostType {
    description: String,
    name: String,
    slug: String,
    rest_base: String,
    rest_namespace: String,
  }

  input MetaInput {
    meta_key: String!,
    meta_value: Int!
  }

  type UpdatePostMetaResponse implements MutationReturnDataFormat {
    success: Boolean
    data: Post
  }

  type Query {
    posts(postType: String!, limit: Int, offset: Int, after: String, taxonomy: String, term: Int): PostReturn
    post(postType: String!, slug: String!): Post
    menu(id: Int, slug: String): Menu
    taxonomies(postType: String!): [Taxonomy]
    terms(taxonomy: String!, restNamespace: String!, page: Int, perPage: Int): [Term],
    postType(postType: String!): PostType
  }

  type Mutation {
    updatePostMeta(postType: String, postID: Int, metaInput: [MetaInput!]!): UpdatePostMetaResponse
  }
`;
