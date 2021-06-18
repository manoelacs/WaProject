import IProduct from './product';

export default interface IOrder{    
    id?: string ;
    order?: IProduct[];
    createdDate?: Date;
    updatedDate?: Date;
}