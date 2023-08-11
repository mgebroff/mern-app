/******************* IMPORT ************************************************/
import { ChartsContainer, StatsContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

/******************* LOADER *************************************************/
export const loader = async () => {
  try {
    const response = await customFetch.get("/jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

/******************* STATS ***************************************************/
const Stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

/******************* EXPORT ***************************************************/
export default Stats;
