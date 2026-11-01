import { Router } from 'express';
export const catalogRouter=Router();
export const categories=[
 {slug:'fashion',name:'Fashion',nameBn:'ফ্যাশন',subcategories:['Men','Women','Kids','Panjabi','Shirts','Saree','Three-piece','Hijab & scarves','Shoes','Bags']},
 {slug:'electronics',name:'Electronics',nameBn:'ইলেকট্রনিকস',subcategories:['Smartphones','Headphones','Power banks','Speakers','Laptops','Keyboards & mice','Smartwatches','Cameras','Chargers']},
 {slug:'home-living',name:'Home & Living',nameBn:'হোম ও লিভিং',subcategories:['Lighting','Wall art','Cushions','Cookware','Tableware','Tea & coffee','Storage','Bedding','Cleaning']},
 {slug:'beauty',name:'Beauty',nameBn:'বিউটি',subcategories:['Cleansers','Moisturisers','Sunscreen','Hair oil','Shampoo','Body care','Perfume','Attar']},
 {slug:'bags-accessories',name:'Bags & Accessories',nameBn:'ব্যাগ ও এক্সেসরিজ',subcategories:['Backpacks','Handbags','Travel','Wallets','Watches','Belts','Sneakers','Sandals']},
 {slug:'grocery',name:'Grocery',nameBn:'গ্রোসারি',subcategories:['Rice & dal','Spices','Oil & ghee','Tea','Biscuits','Juice']}
];
export const products=[
 {slug:'canvas-everyday-backpack',name:'Canvas Everyday Backpack',seller:'Rangpur Crafts',category:'Bags & Accessories',price:2450,compareAt:3200,rating:4.6,reviews:128,image:'/assets/products/backpack.webp'},
 {slug:'quartz-minimal-watch',name:'Quartz Minimal Watch',seller:'TimeHouse BD',category:'Watches',price:3290,image:'/assets/products/watch.webp'},
 {slug:'insulated-steel-bottle-750ml',name:'Insulated Steel Bottle 750ml',seller:'Dhaka Home Co.',category:'Home & Living',price:890,compareAt:1190,image:null},
 {slug:'wireless-over-ear-headphones',name:'Wireless Over-Ear Headphones',seller:'Gadget Ghor',category:'Electronics',price:4990,compareAt:6490,rating:4.5,reviews:203,image:'/assets/products/airbuds.webp'},
 {slug:'everyday-running-sneakers',name:'Everyday Running Sneakers',seller:'Step & Stride',category:'Footwear',price:3150,compareAt:3900,image:'/assets/products/sneakers.webp'},
 {slug:'linen-table-lamp',name:'Linen Table Lamp',seller:'Dhaka Home Co.',category:'Home & Living',price:1990,image:null},
 {slug:'cotton-panjabi-regular-fit',name:'Cotton Panjabi, Regular Fit',seller:'Rajshahi Looms',category:'Fashion',price:1650,compareAt:2200,rating:4.7,reviews:312,image:null},
 {slug:'ceramic-tea-pot-set',name:'Ceramic Tea Pot Set',seller:'Bogura Pottery',category:'Kitchen',price:1420,compareAt:1790,rating:4.8,reviews:95,image:null}
];
catalogRouter.get('/categories',(_req,res)=>res.json({data:categories}));
catalogRouter.get('/products',(_req,res)=>{const {category,search}= _req.query;let data=products;if(category)data=data.filter(p=>p.category.toLowerCase().includes(String(category).toLowerCase()));if(search)data=data.filter(p=>(p.name+' '+p.category+' '+p.seller).toLowerCase().includes(String(search).toLowerCase()));res.json({data,total:data.length})});
catalogRouter.get('/products/:slug',(req,res)=>{const item=products.find(p=>p.slug===req.params.slug);if(!item)return res.status(404).json({error:'NOT_FOUND'});res.json({data:item})});
