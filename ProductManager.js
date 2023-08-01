import fs from "fs";
class ProductManager {
    constructor() {
        this.products = [];
        this.path = "Products.json";
        this.createFile();
    }

    createFile() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        }
    }

    addProduct(product) {
        if (this.validateCode(product.code)) 
        {
            console.log("El codigo ya existe");
        } 
        else 
            {
            const producto = {id:this.generateId(),
                              title:product.title,
                              description:product.description,
                              price:product.price, 
                              thumbnail:product.thumbnail, 
                              code:product.code, 
                              stock:product.stock};

            this.products = this.getProducts();
            this.products.push(producto);    
                              
            this.saveProducts();

            console.log("Producto Agregado!");
        }
    }
        updateProduct(id, product) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products[pos].title = product.title;
            this.products[pos].description = product.description;
            this.products[pos].price = product.price;
            this.products[pos].thumbnail = product.thumbnail;
            this.products[pos].code = product.code;
            this.products[pos].stock = product.stock;
            this.saveProducts();
            console.log("Producto actualizado!");
        } else {
            console.log("No encontrado!");
        }
    }
    deleteProduct(id) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products.splice(pos, 1); (0,1)
            this.saveProducts();
            console.log("Producto #" + id + " borrado!");
        } else {
            console.log("No encontrado!");
        }
    }
    getProducts() {
        let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return products;
    }

    getProductById(id) {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

        return this.products.find(item => item.id === id) || "No Encontrado!";

    }

    validateCode(code) {
        return this.products.some(item => item.code === code);
    }

    generateId() {
        let max = 0;

        this.products.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        });

        return max+1;
        
    }
    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
}
/*const PM = new ProductManager;
console.log(PM.getProducts());
PM.addProduct({title:"Goma", description:"Goma doble color", price:200, thumbnail:"No Tiene", code:"gom123", stock:10});
console.log(PM.getProducts());
PM.addProduct({title:"Lapiz", description:"lapiz comun", price:80, thumbnail:"no tiene tampoco", code:"lap123", stock:9});
PM.addProduct({title:"Regla", description:"Regla para medir lo q quieras", price:500, thumbnail:"menos foto", code:"reg123", stock:8});
console.log(PM.getProducts());
console.log(PM.getProductById(6));
console.log(PM.getProductById(1));*/
export default ProductManager;