import { ERootEndpoints } from "@/constants/enums";
import customFetch from ".";

const setPlayerStatus = async (
  name: string,
  teamIdentifier: string,
  userRole: string
) => {
  await customFetch(ERootEndpoints.User, {
    method: "PUT",
    body: {
      name: name,
      teamIdentifier: teamIdentifier,
      userRole: userRole,
    },
  });
};
export default setPlayerStatus;
