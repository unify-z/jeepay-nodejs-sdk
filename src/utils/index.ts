import { createHash } from "crypto";
import { SDKException } from "../exceptions";
import { appConfig } from "..";




class SignHelper {
  static md5Encrypt(text: string): string {
    return createHash("md5").update(text).digest("hex");
  }

  static signatureRules(signatureParams: Record<string, any>): string {
    try {
      const sortedKeys = Object.keys(signatureParams).sort();
      let text = "";
      for (const key of sortedKeys) {
        const value = signatureParams[key];
        text += `${key}=${value}&`;
      }
      text += `key=${appConfig.getApiKey()}`;
      return this.md5Encrypt(text);
    } catch (err: any) {
      throw new SDKException(err.message);
    }
  }
}

function generateReqParams(signParams: any) {
  signParams.mchNo = appConfig.getMchNo();
  signParams.appId = appConfig.getAppId();
  signParams.reqTime = Math.floor(Date.now() * 1000);
  signParams.version = "1.0.0"
  signParams.signType = "MD5"
  const sign = SignHelper.signatureRules(signParams);
  signParams.sign = sign
  return signParams
  
}

export { generateReqParams, SignHelper };
