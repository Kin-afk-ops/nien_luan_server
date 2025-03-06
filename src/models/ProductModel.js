class Product {
    constructor(id, sellerId, name, description, price, categories, quantityStock, slug, discount, condition, imageUri, imageId, commentIds, reportID, createdAt, updatedAt, location, status) {
        this.id = id;
        this.sellerId = sellerId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categories = categories;
        this.quantityStock = quantityStock;
        this.slug = slug;
        this.discount = discount;
        this.condition = condition;
        this.imageUri = imageUri;
        this.imageId = imageId;
        this.commentIds = commentIds;
        this.reportID = reportID;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.location = location;
        this.status = status;
    }
}

module.exports = Product;