import request from '@/utils/request'
// 计算航线
export function calcRoute(params) {
  return request({
    url: '/api/busi/channelline',
    method: 'get',
    params: params
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/system/user',
    method: 'post',
    data: data
  })
}
