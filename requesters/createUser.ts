import { ERootEndpoints } from "@/constants/enums";
import customFetch from ".";

const createUser = async (name: string) => {
  await customFetch(ERootEndpoints.User, {
    method: "POST",
    body: { name: name },
  });
};
export default createUser;
