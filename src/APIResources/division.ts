import { httpClient } from "../HttpClient";
import { generateReqParams } from "../utils";

interface DivisionBindUserParams {
  ifCode: string;
  receiverAlias: string;
  receiverGroupId: number;
  accType: number;
  accNo: string;
  accName?: string;
  relationType: string;
  relationTypeName?: string;
  channelExtInfo?: string;
  divisionProfit: string;
}

interface DivisionBindUserResponse {
  receiverId: number;
  receiverAlias: string;
  receiverGroupId: number;
  accType: number;
  accNo: string;
  accName?: string;
  relationType: string;
  channelExtInfo?: string;
  divisionProfit: string;
  bindSuccessTime: number;
  bindState: number;
  errCode?: string;
  errMsg?: string;
}

interface DivisionExecParams {
  payOrderId?: string;
  mchOrderNo?: string;
  useSysAutoDivisionReceivers: number;
  receivers?: string;
}

interface DivisionExecResponse {
  state: number;
  channelBatchOrderId?: string;
  errCode?: string;
  errMsg?: string;
}

class Division {
  static async bindUser(
    params: DivisionBindUserParams
  ): Promise<DivisionBindUserResponse> {
    const reqParams = generateReqParams(params);
    return (
      await httpClient.sendRequest(
        "post",
        "/api/division/receiver/bind",
        reqParams
      )
    ).data;
  }
  static async exec(params: DivisionExecParams): Promise<DivisionExecResponse> {
    const reqParams = generateReqParams(params);
    return (
      await httpClient.sendRequest("post", "/api/division/exec", reqParams)
    ).data;
  }
}

export {
    Division
}
