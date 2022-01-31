import React from 'react';
import { FixedSizeListProps } from 'react-window';

export interface InfiniteScrollProps extends Omit<FixedSizeListProps, "itemSize" | "height" | "children"> {
    continerHeight: number;
    itemHeight: number;
    row: ComponentType<ListChildComponentProps<any>> & ReactNode;

}