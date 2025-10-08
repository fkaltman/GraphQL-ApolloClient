import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS, {
    variables: { limit: 12 },
    fetchPolicy: "network-only", // Always fetch fresh data, ignore cache
    errorPolicy: "all", // Show data even if there are errors
  });

  console.log(
    "GetUsers render - loading:",
    loading,
    "error:",
    error,
    "data:",
    data
  );

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("ERROR DETAILS:");
    console.log("- Message:", error.message);
    console.log("- GraphQL Errors:", error.graphQLErrors);
    console.log("- Network Error:", error.networkError);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {data.getAllUsers.map((val) => {
        return <h1 key={val.id}> {val.firstName}</h1>;
      })}
    </div>
  );
}

export default GetUsers;
