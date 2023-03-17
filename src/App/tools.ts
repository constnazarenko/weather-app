import { call, put } from "redux-saga/effects";

async function fetchJson(
  uri: string,
  params?: object,
  authorization?: string,
  method: "post" | "get" = "get"
) {
  let resp;
  try {
    const init = {
      method,
      headers: {},
      body: params ? JSON.stringify(params) : undefined,
    };
    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    if (authorization) {
      headers.Authorization = `Basic ${Buffer.from(authorization).toString(
        "base64"
      )}`;
    }
    init.headers = new Headers(headers);

    const data = await fetch(uri, init);
    resp = { data: await data.json() };
  } catch (e) {
    resp = { err: e.message };
  }
  return resp;
}

export function* loader(
  uri: string,
  params: Record<string, string | number>,
  success: string,
  failure: string,
  authorization?: string
) {
  try {
    const { data, err } = yield call(fetchJson, uri, params, authorization);
    if (data) {
      yield put({ type: success, payload: data });
    } else {
      yield put({ type: failure, ...err });
    }
  } catch (e) {
    yield put({ type: failure, message: e.message });
  }
}

export function* loaderData(
  uri: string,
  params: Record<string, string | number>,
  success: string,
  failure: string,
  authorization?: string
) {
  try {
    const { data, err } = yield call(fetchJson, uri, params, authorization);
    if (data) {
      return data;
    } else {
      yield put({ type: failure, ...err });
    }
  } catch (e) {
    yield put({ type: failure, message: e.message });
  }
}

export const isString = (value: unknown) =>
  typeof value === "string" || value instanceof String;

export const kelvin2c = (degree: number) => Math.round(degree - 273.15);
