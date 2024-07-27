import { ERootEndpoints } from "@/constants/enums";
import customFetch from ".";

const getAllUsers = async () => {
  const response = await customFetch(ERootEndpoints.User, {
    method: "GET",
  });
  return response;
};
export default getAllUsers;
