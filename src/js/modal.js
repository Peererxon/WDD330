fetch('http://server-nodejs.cit.byui.edu:3000/product/15UGY')
  .then((res) => res.json())
  .then((res) => console.log(res));
