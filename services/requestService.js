import axios from "axios";

export const getGuardRequest = async (
  requestParameter = RequestParameter,
  id
) => {
  const token = localStorage.getItem("access-token");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.lang ? `/${requestParameter.lang}` : ""
  }${
    requestParameter.action ? `${requestParameter.action}` : ""
  }${id ? `/${id}` : ""}${
    requestParameter.queryString ? `?${requestParameter.queryString}` : ""
  }`;
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getGuardParamsRequest = async (
  requestParameter = RequestParameter,
  params,
  id
) => {
  const token = localStorage.getItem("access-token");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}/${
    requestParameter.action ? `${requestParameter.action}` : ""
  }${id ? `${id}` : ""}${
    requestParameter.queryString ? `?${requestParameter.queryString}` : ""
  }${
    requestParameter.lang ? `${requestParameter.lang}` : ""
  }`;
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params: params,
    
  });
};

export const postGuardRequest = async (
  requestParameter = RequestParameter,
  body,
  id
) => {
  const token = localStorage.getItem("access-token");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}/${
    requestParameter.action ? `${requestParameter.action}` : ""
  }${id ? `${id}` : ""}${
    requestParameter.queryString ? `?${requestParameter.queryString}` : ""
  }${
    requestParameter.lang ? `${requestParameter.lang}` : ""
  }`;
  return await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const putGuardRequest = async (
  requestParameter = RequestParameter,
  id,
  body
) => {
  const token = localStorage.getItem("access-token");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `${id}` : ""} ${
    requestParameter.lang ? `${requestParameter.lang}` : ""
  }`;
  return await axios.put(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteGuardRequest = async (
  requestParameter = RequestParameter,
  id
) => {
  const token = localStorage.getItem("access-token");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `${id}` : ""} ${
    requestParameter.lang ? `${requestParameter.lang}` : ""
  }`;
  return await axios.delete(id, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const RequestParameter = {
  lang: "",
  controller: "",
  action: "",
  queryString: "",
};