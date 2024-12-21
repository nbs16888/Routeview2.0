import request from '@/utils/request'

// 查询用户列表
export function reqData(url,method,query,data) {
  return request({
    url: url,
    method: method,
    data: data,
    params: query
  })
}
