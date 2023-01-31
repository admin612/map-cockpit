export const getScale = () => {
  return window.screen.availWidth / 1920 || 1;
};

export const mGetDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var d = new Date(year, month, 0);
  return d.getDate();
};

export const monthData = () => {
  var date = new Date();
  var month = date.getMonth() + 1;
  return month;
};

export const countPercentage = (countArray) => {
  var j = eval(countArray.join("+"));

  var resultArray = [];
  for (var i = 0; i < countArray.length; i++) {
    var k = ((countArray[i] / j) * 100).toFixed(2) + "%";
    resultArray.push(k);
  }
  return resultArray;
};

export const theSum = (countArray) => {
  var j = eval(countArray.join("+"));
  return j;
};
