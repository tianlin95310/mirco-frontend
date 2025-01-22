
import { Request } from "./moduleRaw.ts";
// 扩展内部模块
declare module "../module/moduleRaw.js" {
  interface Request {
    url: string;
    hello(): void;
  }
}
Request.prototype.hello = function () {
  console.log('Request hello')
};