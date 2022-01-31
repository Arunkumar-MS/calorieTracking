import React, { FC } from "react";
import { CloseIcon } from "src/svgs/closeIcon.svg";
import throttle from "lodash.throttle";
import axios from "axios";
import { NutritionDetails, suggestionItem } from "./foodEntry.types";
import SuggestionList from "./suggestionList";
import Spinner from "@Component/spinner";
import FoodAddCard from "./foodSelection";

interface FoodEntryProps {
    onClose: () => void;
}

const fetchSuggestion = (query: string) => {
    const headers = {
        'x-app-key': '24ef67c5d46245ab6d32977d7a8c013f',
        'x-app-id': '3846263c',
        'content-type': 'application/json',
    };
    return axios.get(`https://trackapi.nutritionix.com/v2/search/instant?branded=true&common=true&query=${query}&self=false`, { headers })
}



const fetchNutrition = (query: string) => {
    const headers = {
        'x-app-key': '24ef67c5d46245ab6d32977d7a8c013f',
        'x-app-id': '3846263c',
        'content-type': 'application/json',
    };
    return axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, { query }, { headers })
}

const FoodEntry: FC<FoodEntryProps> = ({ onClose }) => {

    const [nutritionList, setNutritionList] = React.useState<suggestionItem[]>([] as suggestionItem[]);
    const [nutritionDetails, setnutritionDetails] = React.useState<NutritionDetails>({} as NutritionDetails);
    const [isNutritionLoading, setNutritionLoading] = React.useState(false);
    const [isNutritionDetailsLoading, setNutritionDetailsLoading] = React.useState(false);
    const [foodName, setFoodName] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');

    const optimizedFetch = React.useCallback(throttle((query) => {
        setNutritionLoading(true);
        fetchSuggestion(query).then((nutritionSuggestion) => {
            const { data } = nutritionSuggestion;
            setNutritionList([...data.common, ...data.branded]);
            setNutritionLoading(false);
        });
    }, 200), []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        query && optimizedFetch(query);
        setSearchTerm(query);
        if (!query) {
            setNutritionList([]);
        }
    }

    const onSelection = async (item: suggestionItem) => {
        setFoodName(item.food_name);
        setNutritionDetailsLoading(true);
        const nutrition = await fetchNutrition(item.food_name);
        setnutritionDetails((nutrition?.data?.foods || [])[0]);
        console.log(nutrition);
        setNutritionDetailsLoading(false);
    }

    const mapNutrition = () => {
        return {
            servingQty: nutritionDetails.serving_qty,
            servingUnit: nutritionDetails.serving_unit,
            servingWeightGrams: nutritionDetails.serving_weight_grams,
            url: nutritionDetails.photo.thumb,
            calories: nutritionDetails.nf_calories,
            name: nutritionDetails.food_name,
        }
    }

    const renderAddNewFoodSection = () => {

    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto text-gray-500" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-80 sm:max-w-sm sm:w-full sm:p-6">
                    <div className="flex -mt-5 -mr-5 justify-end" onClick={onClose}> <CloseIcon className="h-10 w-10 fill-current text-gray-400 hover:text-gray-600" /> </div>

                    <div className="">
                        <div className="">
                            <input onChange={onChangeHandler} type="text" className="block w-full drop-shadow-md border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Search food" />
                        </div>
                    </div>
                    <div className="h-44">
                        {!isNutritionLoading && nutritionList.length ? <SuggestionList suggestions={nutritionList} onClickHandler={onSelection} /> : null}
                        {isNutritionLoading && <Spinner className="mt-3" />}
                    </div>
                    {<div>

                    </div>}
                    {foodName && (
                        <div className=" shadow h-56 bg-white rounded-lg relative mt-5 items-center flex border border-slate-400 -ml-3 -mr-3 -mb-3 sm:-ml-5 sm:-mr-5 sm:-mb-5">
                            {isNutritionDetailsLoading && <Spinner className="pt-10" />}
                            {!isNutritionDetailsLoading && nutritionDetails && <FoodAddCard {...mapNutrition()} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}



export default FoodEntry;