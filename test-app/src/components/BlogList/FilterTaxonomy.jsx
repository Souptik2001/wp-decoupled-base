import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import '../../Filters.css';
import { GET_TERMS } from "../../queries/Terms";
import { PostStoreContext } from "../BlogListRoutes";

function FilterTaxonomy({taxonomy}) {

	const {postType="", taxonomy: taxonomyParam, term} = useParams();

	const {setPosts} = useContext(PostStoreContext);

	const {data} = useQuery(
		GET_TERMS,
		{
			variables: {
				taxonomy: taxonomy?.rest_base,
				restNamespace: taxonomy?.rest_namespace,
				page: 1
			},
			onCompleted: (terms) => {
				if ( terms?.terms ) {
					terms?.terms.forEach((val) => {
						if ( val.id ) {
							setPosts({
								taxonomy: taxonomy?.rest_base,
								term: val.slug,
								postType: postType,
								page: 0,
								total: val.count,
								termID: val.id
							})
						}
					});
				}

			}
		}
	);

	return (
		<div className="tax-filter-section">
			<h4>{taxonomy?.name}</h4>
			<div className="tax-filter-list">
			{
				data?.terms
				&&
				(
					data?.terms.map((val) => {
						return (
							<Link key={val.slug} to={`filter/${taxonomy?.rest_base}/${val.slug}`} className={(taxonomy?.rest_base === taxonomyParam && val?.slug === term) ? "selected-filter" : ""}>{val.name}</Link>
						)
					})
				)
			}
			</div>
		</div>
	);

}

export default FilterTaxonomy;