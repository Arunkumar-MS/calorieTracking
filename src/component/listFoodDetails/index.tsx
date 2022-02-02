import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";
import { AdminOperation } from "./adminOperation";

export const ListFoodDetails = (props: any) => {
    return (
        <div className="text-gray-500 p-2 md:p-3 bg-white hover:bg-gray-50">
            <div className="flex justify-between m-2 text-gray-600">
                <p className="font-medium capitalize" >{props.name}</p>
                <p className="font-medium capitalize text-sm text-gray-500"> {format(fromUnixTime(props.addedDate), "yyyy-MM-dd HH:mm:ss")}</p>
            </div>
            <div className="items-center flex w-full text-sm">
                <div className="w-1/6 flex justify-center flex-col text-ellipsis text-center items-center">
                    <img className="rounded-lg w-12 h-12" src={props.imageUrl} />
                </div>
                <div className="pl-5 w-5/6 pr-5 text-gray-600 ">
                    <p className="flex justify-between"> <span>Serving unit </span> <span> {props.servingUnit}</span></p>
                    <p className="flex justify-between"> <span>Consumend Qty </span> <span> {props.consumedQty}</span></p>
                    <p className="flex justify-between"> <span>Consumend weight in grams </span> <span> {props.consumedWeightGrams}</span></p>
                    <p className="flex justify-between"> <span>Total caloriese consumend </span> <span> {props.consumedCalories}</span></p>
                </div>
            </div>
            {props.isAdmin && <AdminOperation {...props}/>}
        </div>

    )
}
