/******************* IMPORT ************************************************/
import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { JobsContainer, SearchContainer } from "../components";

/******************* LOADER *************************************************/
export const loader = async ({ request }) => {
  console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.data?.msg);
    return error;
  }
};

const AllJobsContext = createContext();
/******************* ALL JOBS ***********************************************/

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

/******************* EXPORT *************************************************/

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;
