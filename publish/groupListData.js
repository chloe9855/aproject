// @ts-check

/**
 * @typedef {import('types/DropdownVerticalOption').DropdownVerticalOption} DropdownVerticalOption
 * @typedef {import('types/Group').Group} Group
 */

/**
 *
 * @param {{ data: Group[] }} item
 * @returns {import('types/DropdownVerticalOption').DropdownVerticalOption<number>[]}
 */
export function groupListData (item) {
  return item.data.map(element => ({ value: element.groupsno, title: element.groupname }));
}

/**
 *
 * @param {{data: Group[] }} item
 * @returns {DropdownVerticalOption[]}
 */
export function iaListData (item) {
  /** @type {Map<string, { value: string, title: string }>} */
  const body = new Map();
  item.data.forEach((element) => {
    body.set(element.ia, { value: element.ia, title: element.ianame });
  });

  return Array.from(body.values());
}

/**
 *
 * @param {{data: Array<import('types/Stn').Stn> }} item
 * @returns {DropdownVerticalOption[]}
 */
export function stnListData (item) {
  return item.data.map(element => ({ value: element.Stn, title: element.Stn_cns }));
}
