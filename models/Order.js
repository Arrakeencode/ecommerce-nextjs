import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
    line_items:Object,
    name:String,
    email:String,
    city:String,
    zip:String,
    address:String,
    country:String,
    paid:Boolean,
    send:{ type: Boolean, default: false },
}, {
    timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);