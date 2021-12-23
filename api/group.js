// @ts-check
import request from '~/service';

/**
 * @typedef {import('types/Group').Group} Group
 * @typedef {{ groupsno: number, name?: string, permit?: string[] }} GroupEditModel
 * @typedef {{ name: string, permit: string[], ia: string }} GroupAddModel
 */

/**
 *
 * @param {string=} Ia
 * @returns {Promise<import('axios').AxiosResponse<Group[]>>}
 */
export function getGroup (Ia) {
  const groupRequest = Ia ? `/aerc/rest/Group?ID=${Ia}` : '/aerc/rest/Group';
  return request.get(groupRequest);
}

/**
 *
 * @param {GroupEditModel} data
 * @param {import('axios').AxiosRequestConfig} config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function editGroup (data, config) {
  return request.patch('/AERC/rest/Group', data, config);
}

/**
 *
 * @param {GroupAddModel} data
 * @param {import('axios').AxiosRequestConfig} config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function addGroup (data, config) {
  return request.post('/AERC/rest/Group', data, config);
}

/**
 *
 * @param {number} id
 * @param {import('axios').AxiosRequestConfig=} config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function delGroup (id, config) {
  return request.delete(`/AERC/rest/Group/${id}`, config);
}
