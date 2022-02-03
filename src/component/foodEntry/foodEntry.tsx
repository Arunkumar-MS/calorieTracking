import React, { FC } from "react";
import { CloseIcon } from "src/svgs/closeIcon.svg";
import debounce from "lodash.debounce";
import { useRouter } from 'next/router';
import { NutritionDetails, suggestionItem } from "./foodEntry.types";
import SuggestionList from "./suggestionList";
import Spinner from "@Component/spinner";
import FoodAddCard from "./foodSelection";
import Link from 'next/link'
import { fetchNutrition, fetchSuggestion } from "@Service/nutritionApi";

interface FoodEntryProps {
    onClose: () => void;
}

const FoodEntry: FC<FoodEntryProps> = ({ onClose }) => {
    const router = useRouter();
    const [nutritionList, setNutritionList] = React.useState<suggestionItem[]>([] as suggestionItem[]);
    const [nutritionDetails, setnutritionDetails] = React.useState<NutritionDetails>({} as NutritionDetails);
    const [isNutritionLoading, setNutritionLoading] = React.useState(false);
    const [isNutritionDetailsLoading, setNutritionDetailsLoading] = React.useState(false);
    const [foodName, setFoodName] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');

    const optimizedFetch = React.useCallback(debounce((query) => {
        setNutritionLoading(true);
        fetchSuggestion(query)
            .then((nutritionSuggestion) => {
                const { data } = nutritionSuggestion;
                setNutritionList([...data.common, ...data.branded]);
                setNutritionLoading(false);
            })
            .catch(() => {
                setNutritionLoading(false);
            });
    }, 300), []);

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
        setNutritionDetailsLoading(false);
    }

    const onSuccesfullAdd = () => {
        onClose();
    }

    const mapNutrition = () => {
        return {
            servingQty: nutritionDetails.serving_qty,
            servingUnit: nutritionDetails.serving_unit,
            servingWeightGrams: nutritionDetails.serving_weight_grams,
            url: nutritionDetails.photo.thumb,
            calories: nutritionDetails.nf_calories,
            name: nutritionDetails.food_name,
            onAdd: onSuccesfullAdd,
        }
    }

    const addFood = () => {
        router.push({
            pathname: '/addFood',
            query: { name: 'Someone' }
        });
    }

    const renderAddNewFoodSection = () => {
        if (!isNutritionLoading && searchTerm && !nutritionList.length) {
            return (<Link href={{ pathname: '/addFood', query: { foodname: searchTerm } }}>
                <div className="text-center border border-slate-400 bg-gray-50 p-2 hover:bg-gray-100">Add new entry</div>
            </Link>);
        }
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto text-gray-500" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-96 sm:max-w-sm sm:w-full sm:p-6">
                    <div className="flex -mt-5 -mr-5 justify-end" onClick={onClose}> <CloseIcon className="h-10 w-10 fill-current text-gray-400 hover:text-gray-600" /> </div>

                    <div className="">
                        <div className="">
                            <input data-test-id="home-page-add-item-modal-input" onChange={onChangeHandler} type="text" className="block w-full drop-shadow-md border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Search food" />
                        </div>
                    </div>
                    {renderAddNewFoodSection()}
                    <div className="h-44" >
                        {!isNutritionLoading && nutritionList.length ? <div data-test-id="home-page-suggesion-list"> <SuggestionList suggestions={nutritionList} onClickHandler={onSelection} /> </div> : null}
                        {isNutritionLoading && <Spinner className="mt-3" />}
                    </div>
                    {foodName && (
                        <div className=" shadow h-72 bg-white rounded-lg relative mt-5 items-center flex border border-slate-400 -ml-3 -mr-3 -mb-3 sm:-ml-5 sm:-mr-5 sm:-mb-5">
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