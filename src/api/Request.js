import axios from "axios";

export const search = async (params) => {
  return await axios.post("/api/search/", params).then(
    (res) => {
      return { data: res.data };
    },
    (error) => {
      return { error };
    }
  );
};
