// export function bulletinInputData (item) {
//   const dataNameArr = [];
//   const dataArr = [];
//   let result = {};
//   item.forEach((element) => {
//     const _id = element.id.split('');
//     if (_id[0] === 'a') {
//       dataNameArr[_id[1]] = element.val;
//     } else if (_id[0] === 'b') {
//       dataArr[_id[1]] = element.val;
//     }
//   });
//   result = { dataname: dataNameArr, data: dataArr };
//   return result;
// }

export function bulletinInputDataName (item) {
  const dataNameArr = [];
  item.forEach((element) => {
    const _id = element.id.split('');
    if (_id[0] === 'a') {
      dataNameArr[_id[1]] = element.val;
    }
  });
  return dataNameArr;
}

export function bulletinInputData (item) {
  const dataArr = [];
  item.forEach((element) => {
    const _id = element.id.split('');
    if (_id[0] === 'b') {
      dataArr[_id[1]] = element.val;
    }
  });
  return dataArr;
}
