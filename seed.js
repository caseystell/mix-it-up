require('dotenv').config();
require('./config/database');

const Category = require('./models/category');

(async function() {
  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Automotive'},
    {name: 'Baby'},
    {name: 'Books'},
    {name: 'Clothing, Shoes & Accessories'},
    {name: 'Collectibles'},
    {name: 'Electronics'},
    {name: 'Furniture'},
    {name: 'Health & Beauty'},
    {name: 'Home Goods & Decor'},
    {name: 'Home Improvement'},
    {name: 'Instruments'},
    {name: 'Kitchen'},
    {name: 'Misc'},
    {name: 'Office'},
    {name: 'Outdoor & Garden'},
    {name: 'Pet'},
    {name: 'Seasonal'},
    {name: 'Sporting Goods'},
    {name: 'Toys'},
  ]);

  process.exit();

})();
