// @ts-check

import { accountTagList } from './accountStatusTag';
import { formatUntilMinute } from './formatDate';

/**
 *
 * @param {import('types/Account').Account[]} data
 * @returns {Array<{ val: number, title: any[] }>}
 */
export function accountData (data) {
  console.log(data);
  const body = [];
  data.forEach((element) => {
    const titleObj = [
      element.account,
      element.name,
      element.ianame,
      element.stnname,
      element.grpname,
      element.note,
      element.groupname,
      formatUntilMinute(element.logintime),
      accountTagList[element.status]
    ];
    body.push({ val: element.account, title: titleObj });
  });
  console.log('body:');
  console.log(body);
  return body;
}

/**
 *
 * @param {import('types/Account').Account[]} accounts
 * @returns {import('./groupListData').DropdownVerticalOption[]}
 */
export function getIaOptionFromAccount (accounts) {
  /**
   * @type {Map<string, import('./groupListData').DropdownVerticalOption>}
  */
  const map = new Map();

  for (const a of accounts) {
    map.set(a.ia, { value: a.ia, title: a.ianame });
  }

  return Array.from(map.values());
}
