export function tableData (data, category = 0) {
  const body = [];
  data.forEach((element) => {
    const titleObj = [];
    const linkObj = { type: 'link', data: element.dataname, url: element.data };
    const timeArr = element.publishtime.split('T');
    const myTime = `${timeArr[0]} ${timeArr[1]}`;

    titleObj.push(element.name);
    // titleObj.push(element.content);

    if (element.category === 0) {
      titleObj.push(element.content);
      titleObj.push(myTime);
      titleObj.push(linkObj);
    };
    if (element.category === 1) {
      titleObj.push(linkObj);
    };
    if (element.category === 2) {
      titleObj.push(linkObj);
    };
    if (element.status && category === element.category) {
      body.push({ title: titleObj, info: element.bulletinsno });
    }
  });
  console.log('body:');
  console.log(body);
  return body;
}
