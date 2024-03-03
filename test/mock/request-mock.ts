import { AxiosResponse } from 'axios';

interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
  status: number;
  message: string;
}

interface IDataRequest<T = any> {
  data: T | null;
  status: httpStatus;
}

enum messageStatus {
  '0200' = 'OK',
  '0201' = 'CREATED',
  '0204' = 'NO_CONTENT',
  '0400' = 'BAD_REQUEST',
  '0401' = 'UNAUTHORIZED',
  '0403' = 'FORBIDDEN',
  '0404' = 'NOT_FOUND',
  '0500' = 'INTERNAL_SERVER_ERROR',
}

type httpStatus = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;

const initResponse: AxiosResponse = {
  data: {},
  status: null,
  statusText: '',
  headers: {},
  config: {},
};
const initResponseError: ErrorResponse = {
  response: { data: { message: '' }, status: null },
  status: null,
  message: '',
};

const mountError = (status: httpStatus): ErrorResponse => {
  const message: string = messageStatus[`0${status}`];
  return {
    ...initResponseError,
    response: { data: { message }, status },
    status,
    message,
  };
};
const mountSuccess = (request: IDataRequest): AxiosResponse => {
  const response: AxiosResponse = {
    ...initResponse,
    data: request.data,
    status: request.status,
    statusText: messageStatus[`0${request.status}`],
  };
  return response;
};

export const mockedRequestSuccess = (
  dataRequest: IDataRequest,
): AxiosResponse => mountSuccess(dataRequest);

export const mockedRequestError = (status: httpStatus): ErrorResponse =>
  mountError(status);
