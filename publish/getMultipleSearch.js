export function getMultipleSearch (data) {
  console.log(data);
  const result = [];
  data.grp.forEach((element, i) => {
    const obj = [];
    obj.push(data.ia);
    obj.push(data.mng);
    obj.push(data.stn);
    obj.push(element);
    result.push(obj);
  });
  console.log(result);
  return result;
}
