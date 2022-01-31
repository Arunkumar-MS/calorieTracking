import React from "react";
import { FixedSizeList as List } from 'react-window';
import { InfiniteScrollProps } from "./infiniteScroll.types";

const InfiniteScroll = ({ row: Row, itemHeight, itemCount, width, continerHeight, itemData }: InfiniteScrollProps) => {

    return <List
        height={continerHeight}
        itemCount={itemCount}
        itemSize={itemHeight}
        width={width}
        itemData={itemData}
    >
        {Row}
    </List>

}

export default InfiniteScroll;