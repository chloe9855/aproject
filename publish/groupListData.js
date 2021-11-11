export function groupListData (item) {
  const body = [];
  item.data.forEach((element) => {
    body.push({ val: element.groupno, title: element.groupname });
  });
  return body;
}

export function iaListData (item) {
  const body = [];
  console.log(item);
  item.data.forEach((element) => {
    body.push({ val: element.ia, title: element.ianame });
  });
  return body;
}

export function stnListData (item) {
  const body = [];
  item.data.forEach((element) => {
    body.push({ val: element.stn, title: element.stnname });
  });
  return body;
}
