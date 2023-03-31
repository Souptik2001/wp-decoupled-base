import { useQuery } from "@apollo/client";
import { Outlet } from "react-router-dom";
import { GET_TAXONOMIES } from "../../queries/Taxonomies";
import FilterTaxonomy from "./FilterTaxonomy";

function Filters({postType}) {

	// TODO: Fetch all the terms from above.
	const {data: taxonomies} = useQuery(
		GET_TAXONOMIES,
		{
			variables: {
				postType: 'post' // TODO: Make this dynamic.
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