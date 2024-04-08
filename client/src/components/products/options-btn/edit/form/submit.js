import axiosClient from "utils/AxiosClient";

export const submit = (data, media, id) => {
  const formData = new FormData();
  for (const property in data) {
    formData.append(property, data[property]);
  }
  if (media) {
    for (const file in media) {
      formData.append("media", media[file]);
    }
  }

  return axiosClient.post(`products/edit/${id}`, formData);
};
