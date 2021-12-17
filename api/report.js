import request from '~/service';

export function getIaCheckReport (data) {
  return request.post('/AERC/rest/IaCheckReport', data);
}

export function getIaApplyReport (data) {
  return request.post('/AERC/rest/IaApplyReport', data);
}

export function getIaApply (data) {
  return request.post('/AERC/rest/IaApply', data);
}

export function getIRCheckReport (data) {
  return request.post('/AERC/rest/IRCheckReport', data);
}

export function getIRApplyReport (data) {
  return request.post('/AERC/rest/IRApplyReport', data);
}
