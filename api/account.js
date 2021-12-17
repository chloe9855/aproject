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
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function editAccount (data) {
  return request.patch('/AERC/rest/Account', data);
}

/**
 *
 * @param {Pick<Account, 'name' | 'ia' | 'mng' | 'stn' | 'grp' | 'mail' | 'note' | 'groupsno'> } data
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export function addAccount (data) {
  return request.post('/AERC/rest/Account', data);
}
