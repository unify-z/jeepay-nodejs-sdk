import { Pay } from "./APIResources/pay.js";
import { Division } from "./APIResources/division.js";
import { Transfer } from "./APIResources/transfer.js";

const __config__ = {
  apiUrl: "",
  appId: "",
  apiKey: "",
  mchNo: "",
};

const sdk_config = {
  http_req_timeout: 10,
  http_req_retries: 1,
};

class AppConfig {
  public config: typeof __config__;
  constructor() {
    this.config = __config__;
  }

  public getCurrentConfig() {
    return this.config;
  }

  public setApiUrl(apiUrl: string) {
    this.config.apiUrl = apiUrl;
  }

  public getApiUrl() {
    return this.config.apiUrl;
  }

  public setApiKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }

  public getApiKey() {
    return this.config.apiKey;
  }

  public setAppId(appId: string) {
    this.config.appId = appId;
  }

  public getAppId() {
    return this.config.appId;
  }

  public setMchNo(mchNo: string) {
    this.config.mchNo = mchNo;
  }

  public getMchNo() {
    return this.config.mchNo;
  }
}

class SDKConfig {
  private config: typeof sdk_config;
  constructor() {
    this.config = sdk_config;
  }

  public getCurrentConfig() {
    return this.config;
  }

  public setHttpRequestTimeout(timeout: number) {
    this.config.http_req_timeout = timeout;
  }

  public getHttpRequestTimeout() {
    return this.config.http_req_timeout;
  }

  public setHttpRequestRetries(retries: number) {
    this.config.http_req_retries = retries;
  }

  public getHttpRequestRetries() {
    return this.config.http_req_retries;
  }
}

const appConfig = new AppConfig();
const sdkConfig = new SDKConfig();

export { appConfig, sdkConfig, AppConfig, SDKConfig, Transfer, Pay, Division };
