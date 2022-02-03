import { NutritionDetails } from '@Component/foodEntry/foodEntry.types';
import { fetchNutrition } from '@Service/nutritionApi';
import debounce from 'lodash.debounce';
import React from 'react';

export const UseNutritionDetails = (foodName: string) => {
    const [nutritionDetails, setnutritionDetails] = React.useState<NutritionDetails>({} as NutritionDetails);
    const [isNutritionDetailsLoading, setNutritionDetailsLoading] = React.useState(false);
    const [nutritionDetailsFetchError, setError] = React.useState('');

    const optimizedFetch = React.useCallback(debounce((foodName) => {
        setError('')
        setNutritionDetailsLoading(true);
        fetchNutrition(foodName)
            .then((nutrition) => {
                const { data } = nutrition;
                setnutritionDetails((data?.foods || [])[0]);
                setNutritionDetailsLoading(false);
            })
            .catch(() => {
                setError('Somthing went wrong!')
            });
    }, 300), []);

    React.useEffect(() => {
        foodName && optimizedFetch(foodName);
    }, [foodName]);

    return [isNutritionDetailsLoading, foodName, nutritionDetails, nutritionDetailsFetchError];
}

export default UseNutritionDetails;

