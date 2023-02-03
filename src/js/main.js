import ProductListing from './productList.js';
import ProductData from './ProductData.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const dataSource = new ProductData('tents');

const productListing = new ProductListing(4, 'tents', dataSource, 'test,');

productListing.init();
