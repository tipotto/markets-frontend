import axios from 'axios';

const search = async (params) => {
  return axios.post('/api/search/', params).then(
    (res) => {
      return { data: res.data };
    },
    (error) => {
      return { error };
    }
  );
};

export default search;
