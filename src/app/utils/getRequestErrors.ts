import { SerializedError } from "@reduxjs/toolkit";

import {
  ISearchMoviesDataErrorObject,
  ISearchMoviesErrorObject,
} from "../interfaces/searchMoviesErrorsInterfaces";

export const getRequestErrors = (
  errorObject:
    | ISearchMoviesErrorObject
    | ISearchMoviesDataErrorObject
    | SerializedError
    | undefined,
) => {
  if (!!errorObject && "error" in errorObject) {
    return errorObject.error;
  }

  if (!!errorObject && "data" in errorObject) {
    return errorObject.data.status_message;
  }
};
