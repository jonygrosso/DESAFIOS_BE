class ProductManager {
    constructor() {
        this.products = [];
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

            this.products.push(producto);
            console.log("Producto Agregado!");
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
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
}
const PM = new ProductManager;
console.log(PM.getProducts());
PM.addProduct({title:"Goma", description:"Goma doble color", price:200, thumbnail:"No Tiene", code:"gom123", stock:10});
console.log(PM.getProducts());
PM.addProduct({title:"Lapiz", description:"lapiz comun", price:80, thumbnail:"no tiene tampoco", code:"lap123", stock:9});
PM.addProduct({title:"Regla", description:"Regla para medir lo q quieras", price:500, thumbnail:"menos foto", code:"reg123", stock:8});
console.log(PM.getProducts());
console.log(PM.getProductById(6));
console.log(PM.getProductById(1));
