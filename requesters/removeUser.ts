import { ERootEndpoints } from "@/constants/enums";
import customFetch from ".";

const removeUser = async (name: string) => {
  await customFetch(ERootEndpoints.User, {
    method: "DELETE",
    body: { name: name },
  });
};
export default removeUser;
