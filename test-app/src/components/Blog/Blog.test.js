import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
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
	const blogDataMock = {
		request: {
			query: GET_POST,
			variables: {
				slug: 'test',
				postType: 'blogs'
			}
		},
		result: {
			data: {
				post: {
				  title: {
					rendered: "Mock Test"
				  },
				  slug: "test",
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
					"post_views": 0
				  }
				}
			}
		}
	};

	const route = "/blog/2023/3/14/test";

	const {baseElement} = render(
		<StaticRouter location={route}>
			<ApolloProvider client={client}>
				<React.StrictMode>
					<MockedProvider addTypename={false} mocks={[blogDataMock]} >
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
