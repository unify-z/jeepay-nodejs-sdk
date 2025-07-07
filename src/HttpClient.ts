import { appConfig, sdkConfig, SDKConfig } from "./index.js";
import { APIRequestException, APIResponseException } from "./exceptions.js";

class HttpClient {

  constructor(){}
  public async sendRequest(
    reqMethod: string = "post",
    reqUrl: string,
    reqParams: any
  ) {
    const baseUrl = appConfig.getApiUrl();
    reqUrl = baseUrl + reqUrl;
    try {
      const method = reqMethod.toLowerCase();
      let options: RequestInit = {
        headers: {
          "Content-Type": "application/json",
        },
        method: method.toUpperCase(),
      };

      if (method === "get" && reqParams) {
        const queryParams = new URLSearchParams(reqParams).toString();
        reqUrl = `${reqUrl}?${queryParams}`;
      } else if (method === "post" && reqParams) {
        options.body = JSON.stringify(reqParams);
      }
      const timeout = sdkConfig.getHttpRequestTimeout();
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout * 1000);

      const response = await fetch(reqUrl, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      const respjson = await response.json();

      if (response.status != 200) {
        throw new APIResponseException(respjson)
      }
      if (respjson.code != 0) {
        throw new APIResponseException(respjson)
      }
      return respjson;
    } catch (error: any) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new APIRequestException("Request timed out");
      }
      throw new APIRequestException(error.message);
    }
  }
}

const httpClient = new HttpClient();

export { httpClient };
