import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { GET_TAXONOMIES } from "../../queries/Taxonomies";
import { PostStoreContext } from "../BlogListRoutes";
import FilterTaxonomy from "./FilterTaxonomy";

function Filters() {

	const { postTypeData } = useContext(PostStoreContext);

	// TODO: Fetch all the terms from above using automatic pagination.
	const {data: taxonomies} = useQuery(
		GET_TAXONOMIES,
		{
			variables: {
				postType: postTypeData?.slug
			},
		}
	);

	return (
		<>
			<div className="filter-section">
				{
					taxonomies?.taxonomies
					&&
					taxonomies?.taxonomies.map((val) => {
						return (
							<FilterTaxonomy key={val.slug} taxonomy={val} />
						);
					})
				}
			</div>
			<Outlet />
		</>
	);

}

export default Filters;