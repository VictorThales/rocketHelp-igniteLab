import { IconProps } from "phosphor-react-native";
import {ReactNode} from "react";

export type CardDetailsProps = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}