// @flow

export default class OrderModel {
    id:number;

    userId:number;

    branchId:number;

    createDate:string;

    type:number;

    status:number;

    tobeDate:string;

    address:string;

    phoneNumber:string;

    orderItem:Array<string>;
}
