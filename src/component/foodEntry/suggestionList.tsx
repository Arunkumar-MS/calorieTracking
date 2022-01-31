import InfiniteScroll from "@Component/infiniteScroll/infiniteScroll";
import React from "react";
import { SuggestionListProps } from "./foodEntry.types";
import SuggestionItem from "./suggestionItem";

const getWith = () => {
    const win = window,
        doc = document,
        docElem = doc.documentElement,
        body = doc.getElementsByTagName('body')[0],
        x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    if (x > 640) {
        return 350;
    }
    return 290;
}

const SuggestionList = (props: SuggestionListProps) => {
    const [width, setWidth] = React.useState(getWith());


    React.useEffect(() => {
        const onrRsizeHander = () => {
            const x = getWith();
            setWidth(x);
        }
        window.addEventListener('resize', onrRsizeHander);
        return () => window.removeEventListener('resize', onrRsizeHander);

    }, []);
    return <InfiniteScroll itemCount={props.suggestions.length} row={SuggestionItem} itemHeight={45} continerHeight={200} itemData={{ items: props.suggestions, onclick: props.onClickHandler }} width={width} />
}



export default SuggestionList;
