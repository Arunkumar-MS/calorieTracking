import { suggestionItem } from '@Component/foodEntry/foodEntry.types';
import { fetchNutrition, fetchSuggestion } from '@Service/nutritionApi';
import debounce from 'lodash.debounce';
import React from 'react';

export const UseNutritionSuggestion = (query: string, shouldFetchSuggestion: boolean = true): [isNutritionLoading: boolean, nutritionList: suggestionItem[]] => {
    const [nutritionList, setNutritionList] = React.useState<suggestionItem[]>([] as suggestionItem[]);
    const [isNutritionLoading, setNutritionLoading] = React.useState(false);
    const [suggesionError, setError] = React.useState('');
    const optimizedFetch = React.useCallback(debounce((query, shouldFetchSuggestion) => {
        if (shouldFetchSuggestion) {
            setError('')
            setNutritionLoading(true);
            fetchSuggestion(query)
                .then((nutritionSuggestion) => {
                    const { data } = nutritionSuggestion;
                    setNutritionList([...data.common, ...data.branded]);
                    setNutritionLoading(false);
                })
                .catch(() => {
                    setError('Somthing went wrong!')
                });
        }
    }, 300), []);

    React.useEffect(() => {
        query && optimizedFetch(query, shouldFetchSuggestion);
    }, [query]);

    return [isNutritionLoading, nutritionList];
}

export default UseNutritionSuggestion;
