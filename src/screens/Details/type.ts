import { OrderProps } from "../../components/Order/type";

export type RouteParams = {
    orderId: string;
}

export type OrderDetails = OrderProps & {
    description: string;
    solution: string;
    closed: string;
}