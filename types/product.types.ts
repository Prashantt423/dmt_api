export interface DiscountType {
    value?:Number,
    startDate?:Date,
    endDate?:Date
}
export interface ProductDetailsType {
    field?:String,
    value?:String
}
export interface VariantType {
    field:String,
    value:String,
    stock:Number
    // dynamically added field type and value
}
export interface AttributeType {
    variant?:[VariantType]
}

export interface ProductType {
        title : String,
        price : Number ,
        description : String,
        discount?: DiscountType,
        attribute?: AttributeType,
        coverImage: String,
        images: [String],
        productDetails?:ProductDetailsType,
        artists?:[String],
        songs?:[String],
        productType:String
}

