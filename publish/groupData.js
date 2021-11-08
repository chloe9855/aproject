export function groupData (data) {
  console.log(data);
  const body = [];

  data.forEach((element, index) => {
    const titleObj = [];
    titleObj.push(element.groupname);
    titleObj.push(element.updatetime);
    body.push({ val: element.groupsno, title: titleObj });
  });
  console.log('body:');
  console.log(body);
  return body;
}
