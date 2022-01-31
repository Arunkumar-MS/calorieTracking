import { ChangeEvent } from "react";


export interface Item {
    foodName: string;
    onSelect: (e: any) => void
}

export interface suggestionItem {
    food_name: string;
    serving_unit: string;
    nix_brand_id: string;
    brand_name_item_name: string;
    serving_qty: number;
    nf_calories: number;
    photo: Photo;
    brand_name: string;
    region: number;
    brand_type: number;
    nix_item_id: string;
    locale: string;
}

export interface Photo {
    highres: string
    is_user_uploaded: boolean
    thumb: string
}

export interface NutritionDetails {
    serving_qty: number;
    serving_unit: string;
    serving_weight_grams: string;
    photo: Photo;
    nf_calories: number;
    food_name: string;
}

export interface SuggestionListProps {
    suggestions: suggestionItem[];
    onClickHandler: (value: suggestionItem) => void
}