// @ts-check
import request from '~/service';

/**
 * @typedef {import('types/Account').Account} Account
 */

/**
 * @param {string=} id
 * @returns {Promise<import('axios').AxiosResponse<Account[]>>}
 */
export function getAccount (id) {
  const accountRequest = id ? `/aerc/rest/Account?ID=${id}` : '/aerc/rest/Account';
  return request.get(accountRequest);
}

/**
 *
 * @param {Partial<Pick<Account, 'name' | 'ia' | 'mng' | 'stn' | 'grp' | 'mail' | 'note' | 'groupsno' | 'status'>> &
 *  { id: string | string[], resend?: boolean, password?: string }} data
 * @param {import('axios').AxiosRequestConfig} config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function editAccount (data, config) {
  return request.patch('/AERC/rest/Account', data, config);
}

/**
 *
 * @param {Pick<Account, 'name' | 'ia' | 'mng' | 'stn' | 'grp' | 'mail' | 'note' | 'groupsno'> } data
 * @param {import('axios').AxiosRequestConfig} config
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function addAccount (data, config) {
  return request.post('/AERC/rest/Account', data, config);
}
