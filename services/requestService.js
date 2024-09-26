import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { signIn } from "next-auth/react";

export const getGuardRequest = async (
  requestParameter = RequestParameter,
  id
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `${requestParameter.action}` : ""
  }${id ? `/${id}` : ""}${
    requestParameter.queryString ? `?${requestParameter.queryString}` : ""
  }`;
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
};

export const getGuardParamsRequest = async (
  requestParameter = RequestParameter,
  params,
  id
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `${id}` : ""}`;
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: params,
  }).catch(err => {
    if(err.status === 401) {
      deleteCookie('next-auth.session-token')
      return signIn()
    }
  })
};

export const postJsonGuardRequest = async (
  requestParameter = RequestParameter,
  body,
  id
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `${id}` : ""}${
    requestParameter.queryString ? `?${requestParameter.queryString}` : ""
  }${
    requestParameter.lang ? `${requestParameter.lang}` : ""
  }`;
  return await axios.post(url, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const postGuardRequest = async (
  requestParameter = RequestParameter,
  body,
  id
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `${id}` : ""}${
    requestParameter.queryString ? `?${requestParameter.queryString}` : ""
  }${
    requestParameter.lang ? `${requestParameter.lang}` : ""
  }`;
  return await axios.post(url, body, {
    headers: { Authorization: `Bearer ${accessToken}`,"Content-Type": "multipart/form-data" },
  });
};

export const putGuardRequest = async (
  requestParameter = RequestParameter,
  id,
  body
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `/${id}` : ""} ${
    requestParameter.lang ? `${requestParameter.lang}` : ""
  }`;
  return await axios.put(url, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deleteGuardRequest = async (
  requestParameter = RequestParameter,
  id
) => {
  const accessToken = getCookie('next-auth.session-token');
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
    requestParameter.action ? `/${requestParameter.action}` : ""
  }${id ? `/${id}` : ""}`;
  return await axios.delete(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const RequestParameter = {
  controller: "",
  action: "",
  queryString: "",
};