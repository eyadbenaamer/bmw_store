import axiosClient from "utils/AxiosClient";

const submit = (data) => {
  const response = axiosClient.post(`login`, data).then(
    (resolved) => {
      return resolved.data;
    },
    (rejected) => {
      return rejected.response.data;
    }
  );
  return response;
};

export default submit;
