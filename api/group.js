import request from '~/service';

export function getGroup (id) {
  console.log(id);
  // return request.get(`/AERC/rest/Group?ID=${id}`);
  return request.get('/AERC/rest/Group');
}

export function editGroup (id, data) {
  return request.patch(`/AERC/rest/Group/${id}`, data);
}

export function addGroup (data) {
  return request.post('/AERC/rest/Group', data);
}

export function delGroup (id) {
  return request.delete(`/AERC/rest/Group/${id}`);
}
