import request from '~/service';

/**
 * @typedef {import('types/Group').Group} Group
 * @typedef {{ groupsno: number, name: string, permit: string[] }} GroupEditModel
 * @typedef {{ name: string, permit: string[], ia: string }} GroupAddModel
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

/**
 *
 * @param {GroupEditModel} data
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function editGroup (data) {
  return request.patch('/AERC/rest/Group', data);
}

/**
 *
 * @param {GroupAddModel} data
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function addGroup (data) {
  return request.post('/AERC/rest/Group', data);
}

export function delGroup (id) {
  return request.delete(`/AERC/rest/Group/${id}`);
}
