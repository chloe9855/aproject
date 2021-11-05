export function tableData (data) {
  const body = [];
  data.forEach((element) => {
    const titleObj = [];
    const linkObj = { type: 'link', data: element.data };
    titleObj.push(element.name);
    titleObj.push(element.content);
    titleObj.push(element.publishtime);
    titleObj.push(linkObj);
    body.push({ title: titleObj });
  });
  console.log('body:');
  console.log(body);
  return body;
}
