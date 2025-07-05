// Pay.test.js
import nock from "nock";
import { Pay } from "../src/APIResources/pay";
import { describe, it, expect, afterEach } from "@jest/globals";
import { appConfig, sdkConfig } from "../src";

appConfig.setApiUrl("http://localhost");
sdkConfig.setHttpRequestTimeout(10);
const API_BASE = "http://localhost";

afterEach(() => {
  nock.cleanAll();
});

describe("Pay SDK 接口测试", () => {
  it("createOrder 应返回创建订单结果", async () => {
    const mockResponse = {
      code: 0,
      data: {
        errCode: "ACQ.PAYMENT_AUTH_CODE_INVALID",
        errMsg:
          "Business Failed【支付失败，获取顾客账户信息失败，请顾客刷新付款码后重新收款，如再次收款失败，请联系管理员处理。[SOUNDWAVE_PARSER_FAIL]】",
        mchOrderNo: "mho1624005752661",
        orderState: 3,
        payOrderId: "P202106181642329900002",
      },
      msg: "SUCCESS",
      sign: "F4DA202C516D1F33A12F1E547C5004FD",
    };

    nock(API_BASE).post("/api/pay/unifiedOrder").reply(200, mockResponse);

    const result = await Pay.createOrder({
      amount: 8,
      extParam: "",
      mchOrderNo: "mho1624005107281",
      subject: "商品标题",
      wayCode: "ALI_BAR",
      body: "商品描述",
      version: "1.0",
      channelExtra: '{"authCode":"280812820366966512"}',
      clientIp: "192.166.1.132",
      notifyUrl: "https://www.jeequan.com",
      currency: "cny",
      returnUrl: "",
    });

    expect(result).toEqual(mockResponse.data);
  });

  it("queryOrder 应返回订单详情", async () => {
    const mockResponse = {
      code: 0,
      data: {
        amount: 58,
        appId: "60cc09bce4b0f1c0b83761c9",
        body: "商品描述",
        channelOrderNo: "2021061822001423031419593035",
        clientIp: "192.166.1.132",
        createdAt: 1623985457705,
        currency: "cny",
        extParam: "",
        ifCode: "alipay",
        mchNo: "M1623984572",
        mchOrderNo: "mho1623985457320",
        payOrderId: "P202106181104177050002",
        state: 2,
        subject: "商品标题",
        successTime: 1623985459000,
        wayCode: "ALI_BAR",
      },
      msg: "SUCCESS",
      sign: "9548145EA12D0CD8C1628BCF44E19E0D",
    };

    nock(API_BASE).post("/api/pay/query").reply(200, mockResponse);

    const result = await Pay.queryOrder({
      payOrderId: "P202106181104177050002",
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("closeOrder 应成功关闭订单", async () => {
    const mockResponse = {
      code: 0,
      data: {
        errCode: "",
        errMsg: "",
      },
      msg: "SUCCESS",
      sign: "9548145EA12D0CD8C1628BCF44E19E0D",
    };

    nock(API_BASE).post("/api/pay/close").reply(200, mockResponse);

    const result = await Pay.closeOrder({
      payOrderId: "P202106181104177050002",
    });
    expect(result).toEqual(mockResponse.data);
  });

  it("refundOrder 应成功退款", async () => {
    const mockResponse = {
      code: 0,
      data: {
        channelOrderNo: "2021061822001423031419593035",
        mchRefundNo: "mho1624007315478",
        payAmount: 58,
        refundAmount: 4,
        refundOrderId: "R202106181708358940000",
        state: 2,
      },
      msg: "SUCCESS",
      sign: "2843B811B7A75D56B7D1950362820875",
    };

    nock(API_BASE).post("/api/refund/refundOrder").reply(200, mockResponse);

    const result = await Pay.refundOrder({
      payOrderId: "P202106181104177050002",
      extParam: "",
      mchOrderNo: "",
      refundReason: "退款测试",
      channelExtra: "",
      mchRefundNo: "mho1624007315478",
      clientIp: "192.166.1.132",
      notifyUrl: "https://www.jeequan.com",
      currency: "cny",
      refundAmount: 4,
    });

    expect(result).toEqual(mockResponse.data);
  });

  it("queryRefundOrder 应返回退款详情", async () => {
    const mockResponse = {
      code: 0,
      data: {
        appId: "60cc09bce4b0f1c0b83761c9",
        channelOrderNo: "2021061822001423031419593035",
        createdAt: 1623985552769,
        currency: "cny",
        extParam: "",
        mchNo: "M1623984572",
        mchRefundNo: "mho1623985552430",
        payAmount: 58,
        payOrderId: "P202106181104177050002",
        refundAmount: 4,
        refundOrderId: "P202106181105527690009",
        state: 2,
        successTime: 1623985554000,
      },
      msg: "SUCCESS",
      sign: "E3F9F008FC5EF84BD782CCC7BE69DC5E",
    };

    nock(API_BASE).post("/api/refund/query").reply(200, mockResponse);

    const result = await Pay.queryRefundOrder({
      refundOrderId: "P202106181105527690009",
    });
    expect(result).toEqual(mockResponse.data);
  });
});
