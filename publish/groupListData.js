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
 * @param {{data: import('~/types/Ia').Ia[] }} item
 * @returns {DropdownVerticalOption[]}
 */
export function iaListData (item) {
  return item.data.map(ia => ({ value: ia.Ia, title: ia.Ia_cns }));
}

/**
 *
 * @param {{data: Array<import('types/Stn').Stn> }} item
 * @returns {DropdownVerticalOption[]}
 */
export function stnListData (item) {
  return item.data.map(element => ({ value: element.Stn, title: element.Stn_cns }));
}
