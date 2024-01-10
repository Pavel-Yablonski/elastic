import Client from "@searchkit/instantsearch-client";
import Searchkit from "searchkit";
import {
    Configure,
    ConfigureProps,
    InstantSearch,
    SearchBox,
    useHits,
} from "react-instantsearch";

const sk = new Searchkit({
    connection: {
        host: "http://localhost:9200",
    },
    search_settings: {
        search_attributes: ["name"],
        result_attributes: ["name", "description"],
        highlight_attributes: ["name"],
    },
});

const searchClient = Client(sk);

const HitRow = ({
    hit,
}: {
  hit: {
    name: string;
    description: string;
  };
}) => {
    return (
        <tr>
            <td>{hit.name}</td>
            <td>{hit.description}</td>
            {/* Add additional columns as needed */}
        </tr>
    );
};

const TableHits = () => {
    const { hits } = useHits<{
    name: string;
    description: string;
  }>();

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    {/* Add additional column headers as needed */}
                </tr>
            </thead>
            <tbody>
                {hits.map((hit) => (
                    <HitRow key={hit.objectID} hit={hit} />
                ))}
            </tbody>
        </table>
    );
};

const App = () => {
    const configureProps = {
        hitsPerPage: 40,
    } as ConfigureProps;

    return (
        <InstantSearch indexName="products" searchClient={searchClient}>
            <Configure {...configureProps} />
            <SearchBox />
            <TableHits />
        </InstantSearch>
    );
};

export default App;
