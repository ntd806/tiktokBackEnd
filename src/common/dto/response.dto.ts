import { STATUSCODE } from "../../constants";

export class BaseResponse {
    code: STATUSCODE;
    message: string;
    data: any;
  
    constructor(code: STATUSCODE, data?: any, message?: string) {
      this.code = code;
      this.message = message;
      this.data = data || null;
    }
}

export class BaseErrorResponse {
    code: STATUSCODE;
    message: string;
    data: any;
  
    constructor(code: STATUSCODE, message?: string, data?: any) {
      this.code = code;
      this.message = message;
      this.data = data || null;
    }
}
  