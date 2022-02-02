import React from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '@Store/hooks';
import { ListFoodDetails } from '@Component/listFoodDetails';
import { FoodEntry } from '@Pages/addFood.types';

const MAX_ITEM_PER_PAGE = 10;
interface Props {
    list: FoodEntry[];
    isAdmin?: boolean;
    className?: string;
}

const FoodEntryList = (props: Props) => {

    const dispatch = useAppDispatch();
    const [pageNo, setPageNumber] = React.useState(1);
    const { list } = props;
    const end = MAX_ITEM_PER_PAGE * pageNo;
    const start = end - MAX_ITEM_PER_PAGE;
    const currentViewItem = list.length < MAX_ITEM_PER_PAGE ? list : list.slice(start, end);
    const showPrevButton = pageNo > 1;
    const showNextButton = end < list.length;

    return (
        <div className={`md:w-10/12 mt-2 md:m-2 md:mt-0 divide-y divide-solid ${props.className}`}>
            {currentViewItem?.map((item) => {
                return <ListFoodDetails {...item} key={item._id} isAdmin={props.isAdmin} />
            })}
            {list.length > 10 && (<div className="flex-1 flex justify-between sm:justify-end mt-5 pt-5 pb-5">
                {showPrevButton && <a onClick={() => setPageNumber(pageNo - 1)} href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                </a>}
                {showNextButton && <a href="#" onClick={() => setPageNumber(pageNo + 1)} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                </a>}
            </div>)}
        </div>
    )
}

export default FoodEntryList;