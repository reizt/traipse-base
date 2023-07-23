import axios, { AxiosError, type Method } from 'axios';
import type { Fetcher } from './call-api';
import { ApiError } from './error';
import { makeRealPath } from './make-real-path';

type Input = {
  cookie: string;
};
export const newAxiosFetcher = (input: Input): Fetcher => {
  return async (req) => {
    const path = makeRealPath(req.path, req.params);
    try {
      const res = await axios.request({
        baseURL: process.env.API_ROOT,
        method: req.method.toUpperCase() as Method,
        url: path,
        data: req.body,
        headers: {
          'Content-Type': 'application/json',
          cookie: input.cookie,
        },
      });
      return {
        status: res.status,
        body: res.data,
        cookies: {},
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new ApiError(err.message, err.response?.data ?? err.message);
      }
      throw err;
    }
  };
};
