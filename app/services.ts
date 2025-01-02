/* -------------------------------------------------------------------------- */
/*                                User services                               */
/* -------------------------------------------------------------------------- */

import axios from "axios";

export const getUsersData = async () => {
  console.log("_Env", process.env);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/users`
    );
    if (response.status) {
      return response.data;
    }
    throw new Error("Failed to fetch");
  } catch (error) {
    throw error;
  }
};
