export const typeDefs = `#graphql
  interface ReturnDataFormat {
    pageInfo: PageInfo
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  type Post {
	  id: Int!
	  slug: String!
    title: Title
	  content: Content
    author: User
    date: String
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

  type Query {
    posts(limit: Int, offset: Int, after: String): PostReturn
    post(slug: String!): Post
    menu(id: Int, slug: String): Menu
  }
`;
