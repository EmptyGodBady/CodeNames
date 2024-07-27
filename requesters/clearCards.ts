import { ERootEndpoints } from "@/constants/enums";
import customFetch from ".";

const clearCards = async () => {
  await customFetch(ERootEndpoints.Cards, {
    method: "DELETE",
  });
};
export default clearCards;
