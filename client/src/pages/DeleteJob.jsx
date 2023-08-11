/******************* IMPORT ************************************************/

import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";
/******************* ACTION ************************************************/
export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries(["jobs"]);

      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };
