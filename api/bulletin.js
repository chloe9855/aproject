import request from '~/service';

export function getBulletin () {
  return request.get('/AERC/rest/Bulletin');
}

export function editBulletin (data) {
  return request.patch('/AERC/rest/Bulletin', data);
}

export function addBulletin (data) {
  return request.post('/AERC/rest/Bulletin', data);
}
