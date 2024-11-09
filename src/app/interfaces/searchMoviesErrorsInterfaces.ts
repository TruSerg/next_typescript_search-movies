export interface ISearchMoviesErrorObject {
  status: string;
  error: string;
}

export interface ISearchMoviesDataErrorObject {
  status: number;
  data: IErrorDataObject;
}

interface IErrorDataObject {
  status_code: number;
  status_message: string;
  success: boolean;
}
