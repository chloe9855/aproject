export function tableData (data, category = 0) {
  const body = [];
  data.forEach((element) => {
    const titleObj = [];
    const linkObj = { type: 'link', data: element.data };
    titleObj.push(element.name);
    titleObj.push(element.content);
    if (element.category === 0) {
      titleObj.push(element.publishtime);
      titleObj.push(linkObj);
    };
    if (element.status && category === element.category) {
      body.push({ title: titleObj });
    }
  });
  console.log('body:');
  console.log(body);
  return body;
}
