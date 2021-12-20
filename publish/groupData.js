// @ts-check

import { formatUntilMinute } from './formatDate';

/**
 * @param {import("~/api/group").Group[]} data
 */
export function groupData (data) {
  console.log(data);
  const body = [];

  data.forEach((element, index) => {
    const titleObj = [];
    titleObj.push(element.groupname);
    titleObj.push(element.ianame);
    titleObj.push(formatUntilMinute(element.createtime));
    titleObj.push(formatUntilMinute(element.updatetime));
    body.push({ val: element.groupsno, title: titleObj, info: element });
  });
  console.log('body:');
  console.log(body);
  return body;
}
