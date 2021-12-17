import request from '~/service';

/**
 * @typedef {import('types/Group').Group} Group
 */

/**
 *
 * @param {string=} Ia
 * @returns {Promise<import('axios').AxiosResponse<Group[]>}
 */
export function getGroup (Ia) {
  const groupRequest = Ia ? `/aerc/rest/Group?ID=${Ia}` : '/aerc/rest/Group';
  return request.get(groupRequest);
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
