import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { StatusCond } from "../screens/Home/type";

export type OrderFirestoreDTO = {
    patrimony: string;
    description: string;
    status: StatusCond;
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp;
    closed_at?:  FirebaseFirestoreTypes.Timestamp;
}