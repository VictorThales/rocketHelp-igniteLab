import { IButtonProps } from "native-base";

export type FilterProps = IButtonProps & {
    title: string;
    isActive?: boolean;
    type: 'open' | 'close';
}