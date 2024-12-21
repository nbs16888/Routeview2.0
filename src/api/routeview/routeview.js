import request from '@/utils/request'

// 获取方案信息详细信息
export function getRoutes() {
  return request({
    url: '/api/busi/route',
    method: 'get',
    headers: {isToken: false}
  })
}

// 新增整治方案
export function addRoutes(data) {
  return request({
    url: '/yycb/wlzz/plan/add',
    method: 'post',
    data: data
  })
}
