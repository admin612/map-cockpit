import axios from "axios";
import { get, isEmpty, merge } from "lodash";
import qs from "qs";

const builder = (data, message, code = 0, date /* headers = {} */) => {
  const responseBody = {
    success: true,
    message: "",
    timestamp: 0,
    result: null,
    code: 0,
  };
  responseBody.result = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
  }
  responseBody.timestamp = date || new Date().getTime();
  return responseBody;
};

const resHandler = (response) => {
  const D = response.data || {};
  const { success, message, code, date, data, ...others } = D;
  let msg = message;
  let status = code || response.status;
  let result = data;
  if (!msg && response.message) {
    const temp = response.message.match(new RegExp("(\\scode\\s)(\\d+)$", "g"));
    const tempCode = temp && temp[0];
    tempCode &&
      (status = tempCode.replace(new RegExp("\\D+", "g"), "")) &&
      (msg = response.message);
  }
  !msg && response.status == 200 && (msg = response.statusText);
  (typeof result === "undefined" || (!result && isNaN(Number(result)))) &&
    (result = others);
  const res = Object.assign({}, builder(result, msg, status, date), {
    success,
  });
  return { success, res, config: response.config };
};

/**
 * @description 创建请求实例
 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create();
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return errorHandler(error);
    }
  );
  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      const { success, res } = resHandler(response);
      if (success) {
        return res;
      } else {
        return errorHandler(response);
      }
    },
    (error) => {
      return errorHandler(error);
    }
    /*     error => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
      handleError(error)
      throw error
    } */
  );
  return service;
}

function stringify(data) {
  return qs.stringify(data, { allowDots: true, encode: false });
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequest(service) {
  return async function (config) {
    // const token = storage.get(ACCESS_TOKEN) || "";
    const configDefault = {
      headers: {
        // Authorization: token,
        // "Access-Token": token,
        // token: token,
        "Content-Type": get(config, "headers.Content-Type", "application/json"),
      },
      timeout: 10000,
      baseURL: "/api",
      data: {},
    };
    const option = merge(configDefault, config);
    // 处理 get 请求的参数
    // 请根据实际需要修改
    if (!isEmpty(option.params)) {
      option.url = option.url + "?" + stringify(option.params);
      option.params = {};
    }
    // 当需要以 form 形式发送时 处理发送的数据
    // 请根据实际需要修改
    if (
      !isEmpty(option.data) &&
      option.headers["Content-Type"].indexOf(
        "application/x-www-form-urlencoded"
      ) >= 0
    ) {
      option.data = stringify(option.data);
    }
    return service(option);
  };
}

// 用于真实网络请求的实例和请求方法
export const service = createService();
export const request = createRequest(service);

// 异常拦截处理器
const errorHandler = async (error) => {
  /*
  config: {url: "/outh/getpicverifycode", method: "post", headers: {…}, baseURL: "", transformRequest: Array(1), …}
  data: {code: 200, success: true, message: "", data: {…}, date: "Mon May 10 19:42:00 CST 2021"}
  headers: {connection: "close", content-type: "application/json", date: "Mon, 10 May 2021 11:42:00 GMT", transfer-encoding: "chunked", x-powered-by: "Express"}
  request: XMLHttpRequest {readyState: 4, timeout: 6000, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
  status: 200
  statusText: "OK"
  */
  const { res } = resHandler(error);
  return Promise.reject(res);
};

export default request;
