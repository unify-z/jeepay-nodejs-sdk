import { httpClient } from "../HttpClient.js";
import { generateReqParams } from "../utils/index.js";

interface CreateTransferOrderParams {
  mchOrderNo: string;
  ifCode: string;
  entryType: string;
  amount: number;
  currency: string;
  accountNo: string;
  accountName?: string;
  bankName?: string;
  clientIp?: string;
  transferDesc?: string;
  notifyUrl?: string;
  channelExtra?: string;
  extParam?: string;
}

interface CreateTransferOrderResponse {
  transferId: string;
  mchOrderNo: string;
  state: number;
  channelOrderNo?: string;
  errCode?: string;
  errMsg?: string;
}

interface QueryTransferParams {
  transferId: string;
  mchOrderNo?: string;
}

interface QueryTransferResponse {
  mchNo: string;
  appId: string;
  mchOrderNo: string;
  transferId: string;
  amount: number;
  currency: string;
  ifCode: string;
  entryType: string;
  state: number;
  accountNo: string;
  accountName?: string;
  bankName?: string;
  transferDesc?: string;
  channelOrderNo?: string;
  errCode?: string;
  errMsg?: string;
  extParam?: string;
  createdAt: number;
  successTime?: number;
}

class Transfer{
    static async create(params: CreateTransferOrderParams): Promise<CreateTransferOrderResponse> {
        const reqParams = generateReqParams(params);
        return (
            await httpClient.sendRequest("post", "/api/transferOrder", reqParams)
        ).data;
    }
    static async query(params: QueryTransferParams): Promise<QueryTransferResponse> {
        const reqParams = generateReqParams(params);
        return (
            await httpClient.sendRequest("post", "/api/transfer/query", reqParams)
        ).data;
    }
}

export {
  Transfer
}