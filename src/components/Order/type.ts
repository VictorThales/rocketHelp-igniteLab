import { IPressableProps } from "native-base";

export type OrderProps = {
id: string;
patrimony: string;
when: string;
status: 'open' | 'close';
}

export type IOrder = IPressableProps & {
    data: OrderProps;
}