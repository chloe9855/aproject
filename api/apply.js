import request from '~/service';

export function getApplySetting () {
  return request.get('/AERC/rest/ApplySetting');
}

export function getEditApplySetting (id) {
  return request.get(`/AERC/rest/ApplySetting?ID=${id}`);
}

export function editApplySetting (data) {
  return request.patch('/AERC/rest/ApplySetting', data);
}

export function addApplySetting (data) {
  return request.post('/AERC/rest/ApplySetting', data);
}

export function applySettingCheck () {
  return request.post('/AERC/rest/ApplySettingCheck');
}

export function getApplyEvent (data) {
  return request.post('/AERC/rest/GetEvent', data);
}

export function editApplyEvent (data) {
  return request.patch('/AERC/rest/Event', data);
}

export function addApplyEvent (data) {
  return request.post('/AERC/rest/Event', data);
}
