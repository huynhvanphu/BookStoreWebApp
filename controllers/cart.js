module.exports = function(currentCart){
    this.items = currentCart.items || {};
    this.contact = currentCart.contact || {};
    this.paymentMethod = currentCart.paymentMethod || 'COD';
    this.add = (item) => {
        let storedItem = this.items[item.id];
        if (!storedItem){
            this.items[item.id] = { item : item, quantity: 0, price: 0};
            storedItem = this.items[item.id];
        }
        storedItem.item.price = parseFloat(storedItem.item.price);
        storedItem.quantity++;
        storedItem.price = storedItem.item.price*storedItem.quantity;
    }
    this.update = (ProductId, quantity) => {
        let storedItem = this.items[ProductId];
        if (storedItem && quantity >= 1) {
            storedItem.quantity = quantity;
            storedItem.price =  parseFloat(storedItem.item.price*quantity).toFixed(2);
        }
    }
    this.remove = (ProductId) => {
        const storedItem = this.items[ProductId];
        if (storedItem){
            this.items[ProductId] = undefined;
        }
    }
    this.generateArray = () => {
        var arr = [];
        for (var id in this.items) {
            this.items[id].item.price = parseFloat(this.items[id].item.price).toFixed(2);
            this.items[id].price = parseFloat(this.items[id].price).toFixed(2);
            arr.push(this.items[id]);
        }
        return arr;
    }
    this.totalPrice = () => {
        let total = 0;
        for (var id in this.items){
            total += parseFloat(this.items[id].price);
        }
        return total.toFixed(2);
    }
    this.totalQuantity = () => {
        let total = 0;
        for (var id in this.items) {
            total+= parseInt(this.items[id].quantity);
        }
        return total;
    }
    this.empty = () => {
        this.items = {};
    }
}
