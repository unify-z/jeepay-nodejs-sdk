import { httpClient } from "../HttpClient.js";
import { generateReqParams } from "../utils/index.js";

interface CreateOrderParams {
  mchOrderNo: string;
  wayCode: string;
  amount: number;
  currency: string;
  clientIp: string;
  subject: string;
  body: string;
  notifyUrl?: string;
  returnUrl?: string;
  expiredAt?: number;
  channelExtra?: string;
  divisionMode?: number;
  extParam?: string;
}

interface CreateOrderResponse {
  payOrderId: string;
  mchOrderNo: string;
  orderState: number;
  payDataType: string;
  payData?: string;
  errCode?: string;
  errMsg?: string;
}

interface QueryOrderParams {
  payOrderId: string;
}

interface QueryOrderResponse {
  payOrderId: string;
  mchNo: string;
  appId: string;
  mchOrderNo: string;
  ifCode: string;
  wayCode: string;
  amount: number;
  currency: string;
  state: number;
  clientIp?: string;
  subject: string;
  body: string;
  channelOrderNo?: string;
  errCode?: string;
  errMsg?: string;
  extParam?: string;
  createdAt: number;
  successTime?: number;
}

interface CloseOrderParams {
  payOrderId: string;
}

interface CloseOrderResponse {
  errCode?: string;
  errMsg?: string;
}

interface RefundOrderParams {
  payOrderId: string;
  mchRefundNo: string;
  refundAmount: number;
  currency: string;
  refundReason: string;
  clientIp: string;
  notifyUrl?: string;
  channelExtra?: string;
  extParam?: string;
}

interface RefundOrderResponse {
  refundOrderId: string;
  mchRefundNo: string;
  state: number;
  channelOrderNo?: string;
  errCode?: string;
  errMsg?: string;
}

interface QueryRefundOrderParams {
  refundOrderId: string;
}

interface QueryRefundOrderResponse {
  refundOrderId: string;
  payOrderId: string;
  mchNo: string;
  appId: string;
  mchRefundNo: string;
  payAmount: number;
  refundAmount: number;
  currency: string;
  state: number;
  channelOrderNo?: string;
  errCode?: string;
  errMsg?: string;
  extParam?: string;
  createdAt: number;
  successTime?: number;
}

interface ChannelUserJumpRequest {
  ifCode: string;
  redirectUrl: string;
}

class Pay {
  /**
   * 发起创建订单请求
   * @param params - 创建订单所需的参数，接收 {@link CreateOrderParams}
   * @returns 返回一个 {@link CreateOrderResponse} 类型的 Promise 对象
   */
  static async createOrder(
    params: CreateOrderParams
  ): Promise<CreateOrderResponse> {
    const reqParams = generateReqParams(params);
    return (
      await httpClient.sendRequest("post", "/api/pay/unifiedOrder", reqParams)
    ).data;
  }
  /**
   * 发起查询订单请求
   * @param params - 查询订单所需的参数，接收 {@link QueryOrderParams}
   * @returns 返回一个 {@link QueryOrderResponse} 类型的 Promise 对象
   */
  static async queryOrder(
    params: QueryOrderParams
  ): Promise<QueryOrderResponse> {
    const reqParams = generateReqParams(params);
    return (await httpClient.sendRequest("post", "/api/pay/query", reqParams))
      .data;
  }
  /**
   * 发起关闭订单请求
   * @param params - 关闭订单所需的参数，接收 {@link CloseOrderParams}
   * @returns 返回一个 {@link CloseOrderResponse} 类型的 Promise 对象
   */
  static async closeOrder(
    params: CloseOrderParams
  ): Promise<CloseOrderResponse> {
    const reqParams = generateReqParams(params);
    return (await httpClient.sendRequest("post", "/api/pay/close", reqParams))
      .data;
  }
  /**
   * 发起退款订单请求
   * @param params - 退款订单所需的参数，接收 {@link RefundOrderParams}
   * @returns 返回一个 {@link RefundOrderResponse} 类型的 Promise 对象
   */
  static async refundOrder(
    params: RefundOrderParams
  ): Promise<RefundOrderResponse> {
    const reqParams = generateReqParams(params);
    return (
      await httpClient.sendRequest("post", "/api/refund/refundOrder", reqParams)
    ).data;
  }
  /**
   * 发起查询退款订单请求
   * @param params - 查询退款订单所需的参数，接收 {@link QueryRefundOrderParams}
   * @returns 返回一个 {@link QueryRefundOrderResponse} 类型的 Promise 对象
   */
  static async queryRefundOrder(
    params: QueryRefundOrderParams
  ): Promise<QueryRefundOrderResponse> {
    const reqParams = generateReqParams(params);
    return (
      await httpClient.sendRequest("post", "/api/refund/query", reqParams)
    ).data;
  }

  static async ChannelUser(
    params: ChannelUserJumpRequest
  ){
    const reqParams = generateReqParams(params);
    return (
      await httpClient.sendRequest("post", "/api/pay/channelUserJump", reqParams)
    ).data;
  }
}

export { Pay };
