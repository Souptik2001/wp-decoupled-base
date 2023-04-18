import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { UPDATE_POST_META } from '../../mutations/PostMeta';
import { GET_POST } from '../../queries/Post';
import { PostStoreContext } from '../BlogListRoutes';
import Blog from './Blog';

// TODO: Mock data is not being received. The original is returned - Pass the same variables in the mockdata structure. MockedProvider component should be inside ApolloProvider.
// TODO: Confirm that which variable to use in snapshot.
// TODO: Router not working.

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache()
});

const postStore = {
	postTypeData: {
		rest_base: "blogs"
	}
};

test('renders single blog page', async () => {
	const initialViews = 10;
	const increasedView = initialViews + 1;
	const blogDataMock = {
		request: {
			query: GET_POST,
			variables: {
				slug: 'test',
				postType: 'blogs'
			}
		},
		result: {
			"data": {
				"post": {
				  "title": {
					"rendered": "Mock Test"
				  },
				  "slug": "test",
				  "id": 5,
				  "date": "2023-04-14T15:45:57",
				  "content": {
					"rendered": "\n<p>This is a mock test data.</p>\n"
				  },
				  "author": {
					"id": 1,
					"name": "admin",
					"slug": "admin",
					"link": "https://test.lndo.site/author/admin/"
				  },
				  "meta": {
					"post_views": initialViews
				  }
				}
			}
		}
	};

	// This is for the mutation called for updating the post count.
	const blogUpdateMockData = {
		request: {
			query: UPDATE_POST_META,
			variables: {
				postType: "blogs",
				postID: 5,
				metaInput: [
					{
						meta_key: "post_views",
						meta_value: increasedView
					}
				]
			}
		},
		result: {
			"data": {
			  "updatePostMeta": {
				"success": true,
				"data": {
				  "id": 5,
				  "title": {
					"rendered": "Mock Test"
				  },
				  "author": {
					"id": 1,
					"link": "https://test.lndo.site/author/admin/",
					"name": "admin",
					"slug": "admin"
				  },
				  "content": {
					"rendered": "\n<p>This is a mock test data.</p>\n",
					"protected": false
				  },
				  "date": "2023-04-14T15:45:57",
				  "slug": "test",
				  "type": "blog",
				  "excerpt": {
					"rendered": "<p>This is a test.</p>\n"
				  },
				  "meta": {
					"post_views": increasedView
				  }
				}
			  }
			}
		}
	}

	const route = "/blog/2023/3/14/test";

	const {baseElement} = render(
		<StaticRouter location={route}>
			<ApolloProvider client={client}>
				<React.StrictMode>
					{
						/** Have to provide blogUpdateMockData twice, so that it doesn't throw warning that "No mock response found."
						 * Not exactly sure why. But in a GH discussion found that we have to provide the mock query and response as many times, that the query is actually called.
						 * So, because of the same development mode issue the mutation is called twice, and because of that the mock should be provided twice.
						 */
					}
					<MockedProvider addTypename={false} mocks={[blogDataMock, blogUpdateMockData, blogUpdateMockData]} >
						<PostStoreContext.Provider value={postStore}>
							<Routes>
								<Route path='/blog/:year/:month/:date/:slug' element={<Blog />} />
							</Routes>
						</PostStoreContext.Provider>
					</MockedProvider>
				</React.StrictMode>
			</ApolloProvider>
		</StaticRouter>
	);

	await waitFor(
		() => screen.findByTestId("single-post-content"),
		{
			timeout: 1000 * 60
		}
	);

	expect(baseElement.outerHTML).toMatchSnapshot();
});
