import React from "react";
import { suggestionItem } from "./foodEntry.types";

const SuggestionItem = ({ index, style, data }: any) => {
    const item = data.items[index] as suggestionItem;
    const onclick = data.onclick;
    return (
        <div style={style} className="flex m-2 text-ellipsis items-center" onClick={() => onclick(item)}>
            <img alt={item.food_name} src={item.photo.thumb} className="h-5 w-5" />
            <div className="ml-2">
                {item.food_name}
            </div>
        </div>
    )
}

export default SuggestionItem;
