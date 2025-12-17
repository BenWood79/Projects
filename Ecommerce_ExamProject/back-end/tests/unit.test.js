const express = require('express');
const request = require('supertest');
const app = express();
app.use(express.json());
require('dotenv').config()
const URL = 'http://localhost:3000';

//Refactored and debugged using Copilot
jest.mock('../services/ProductService', () => {
    let product = {
        category: 'TEST_CATEGORY',
        brand: 'TEST_BRAND',
        name: 'TEST_PRODUCT',
        price: 99.99,
        quantity: 10
    };
    return jest.fn().mockImplementation(() => ({
        updateCategory: jest.fn().mockImplementation((category) => {
            product.category = category;
            return Promise.resolve({ ...product });
        }),

        updateBrand: jest.fn().mockImplementation((brand) => {
            product.brand = brand;
            return Promise.resolve({ ...product });
        }),

        create: jest.fn().mockImplementation((newProduct) => {
            product = { ...product, ...newProduct };
            return Promise.resolve({ ...product });
        }),

        getProductByName: jest.fn().mockImplementation(() => 
            Promise.resolve({ ...product }
        )),

        updateCategoryName: jest.fn().mockImplementation(() => {
            product.category = 'TEST_CATEGORY2';
            return Promise.resolve({ ...product });
        }),

        updateBrandName: jest.fn().mockImplementation(() => {
            product.brand = 'TEST_BRAND2';
            return Promise.resolve({ ...product });
        }),

        deleteProduct: jest.fn().mockImplementation(() => {
            product.deleted = true;
            return Promise.resolve({ ...product });
        })

    }));
});
//Refactored and debugged using Copilot
var categoriesRouter  = require('../routes/categories');
var productsRouter = require('../routes/products');
var brandsRouter = require('../routes/brands');

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/brands', brandsRouter);
//Refactored and debugged using Copilot
describe ('testing-routes', () => {
    test("POST /Should add a new category to product id 1", async () => {
        const response = await request(app)
        .post('/categories/add')
        .set('Accept', 'application/json')
        .send({ category: 'TEST_CATEGORY', productId: 1 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.result.category).toBe('TEST_CATEGORY');
    });
    //Refactored and debugged using Copilot
    test("POST /Should add a new brand to product id 1", async () => {
        const response = await request(app)
        .post('/brands/add')
        .set('Accept', 'application/json')
        .send({ brand: 'TEST_BRAND', productId: 1 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.result.brand).toBe('TEST_BRAND');
    });
    //Refactored and debugged using Copilot
    test("POST /Should add a new row to the products table", async () => {
        const response = await request(app)
        .post('/products/add')
        .set('Accept', 'application/json')
        .send({ 
            productId: 0, 
            category: 'TEST_CATEGORY',
            brand: 'TEST_BRAND',
            imgurl: '',
            name: 'TEST_PRODUCT',
            description: '',
            price: 99.99,
            quantity: 10,
            date_added: new Date(),
            deleted: false
         });
         expect(response.statusCode).toBe(200);
         expect(response.body).toHaveProperty('data');
         expect(response.body.data.result.category).toBe('TEST_CATEGORY');
         expect(response.body.data.result.brand).toBe('TEST_BRAND');
         expect(response.body.data.result.name).toBe('TEST_PRODUCT');
         expect(response.body.data.result.price).toBe(99.99);
         expect(response.body.data.result.quantity).toBe(10);
    });
    //Refactored and debugged using Copilot
    test("GET /Should get the newly added product", async () => {
        const response = await request(app)
        .get('/products/TEST_PRODUCT')
        .set('Accept', 'application/json');
         expect(response.statusCode).toBe(200);
         expect(response.body).toHaveProperty('data');
         expect(response.body.data.result.category).toBe('TEST_CATEGORY');
         expect(response.body.data.result.brand).toBe('TEST_BRAND');
         expect(response.body.data.result.name).toBe('TEST_PRODUCT');
    
    });
    //Refactored and debugged using Copilot
    test("PUT /Should change the newly added product's category", async () => {
        const response = await request(app)
        .put('/products/category')
        .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.result.category).toBe('TEST_CATEGORY2');
        })
    //Refactored and debugged using Copilot
    test("PUT /Should change the newly added product's brand", async () => {
        const response = await request(app)
        .put('/products/brand')
        .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.result.brand).toBe('TEST_BRAND2');
        })
    //Refactored and debugged using Copilot
    test("DELETE /Should delete the product", async () => {
        const response = await request(app)
        .delete('/products/product')
        .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        })
});