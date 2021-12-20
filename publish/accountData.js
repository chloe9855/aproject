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
    const titleObj = [];
    titleObj.push(element.account);
    titleObj.push(element.name);
    titleObj.push(element.ianame);
    titleObj.push(element.stnname);
    titleObj.push(element.groupname);
    titleObj.push(formatUntilMinute(element.logintime));
    titleObj.push(accountTagList[element.status]);
    body.push({ val: element.account, title: titleObj });
  });
  console.log('body:');
  console.log(body);
  return body;
}
