export class Product {

    constructor(public id:number,
                public sku: string,
                public name: string,
                public description: string,
                public unitPrice: number,
                public imageUrl: string,
                public active: boolean,
                public unitsInStock: number,
                public dateCreated: Date,
                public lastUpdated: Date
        ) {
    }
    // "id": 1,
    // "sku": "BOOK-TECH-1000",
    // "name": "Crash Course in Python",
    // "description": "Learn Python at your own pace. The author explains how the technology works in easy-to-understand language. This book includes working examples that you can apply to your own projects. Purchase the book and get started today!",
    // "unitPrice": 14.99,
    // "imageUrl": "assets/images/products/books/book-luv2code-1000.png",
    // "active": true,
    // "unitsInStock": 100,
    // "dateCreated": "2023-07-17T10:57:52.000+00:00",
    // "lastUpdated": null,
}
