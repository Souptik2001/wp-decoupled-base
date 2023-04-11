# WP Decoupled Sample

A WordPress decoupled setup. The total setup is divided into three parts -
- **WordPress** - Just a CMS to store the data and exposes the data to be consumed by its REST API.
- **GraphQL Server** - GraphQL runs as a separate service, which is used by the frontend React application to consume data. GraphQL uses the WordPress as one of its data source (in this case the one and only data source) to consume data and serve that to frontend application.
- **Frontend React Application** - The React application consumes the data from the the GraphQL server and displays that to the user.

### Local setup

- Clone the repository.
- WordPress setup -
	- Create a local WordPress setup.
	- Copy the backend directory's content to `wp-content` folder.
	- Optional - Activate the `wp-rest-api-v2-menus` plugin - `wp plugin activate wp-rest-api-v2-menus`  (if you want to see the nav-menus).
	  - The `primary menu` will be displayed on the nav-menu. So, you have to create a menu and assign that to `primary menu`.
	- Activate the `wordpress-importer` plugin - `wp plugin activate wordpress-importer`.
	- Import the sample data provided using - `wp import <file> --authors=create`.
	- Change the permalink structure to some pretty permalink structure.
- GraphQL setup -
	- Go to the `graphql` directory of the project.
	- Run `nvm use`.
	- Run `npm install`.
	- Run `npm run start` or `npm run dev`(runs `nodemon`).
- React setup -
	- Go to `test-app` directory.
	- Run `nvm use`.
	- Run `npm install`.
	- Run `npm run serve` (To create production-ready build).
	- Please note that if you run development build, using `npm run start` there will be one issue -
	  - You will see that the post views in post single page is increasing by 2 instead of 1. This is because of React Strict mode's twice running `useEffect()` hook on development build.

### TODO

- Unit Testing. Have to write the following unit tests -
  - [ ] Surely something..