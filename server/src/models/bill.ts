
export interface IBill extends Document {
    orderDate: Date,
    deliveryDate: Date,
    items: Array<IBillItems>,
    paidStatus: string,
    itemStatus: string,
    totalAmount: number,
    deliveryAmount: number,
    paidAmount: number,
    totalItems: number,
    totalDeliveredItems: number,
    company: string,
    userId: string
}
interface IBillItems {
    serialNo: number,
    article: string,
    noOfItem: number,
    deliveredItems: number,
    discount: number,
    price: number,
    totalPrice: number,
    amountToPay: number
}