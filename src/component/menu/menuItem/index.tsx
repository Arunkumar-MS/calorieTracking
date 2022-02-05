import React from 'react';

interface Props {
    title: string | React.ReactElement;
    onClick?: (e: any) => void;
    className?: string;
    dataTestId?: string;
    linkTo?: string;
}

export const MenuItem = (props: Props) => {

    const testDataAtr = props.dataTestId ? { ['data-test-id']: props.dataTestId } : {};

    return (
        <a {...testDataAtr} onClick={props.onClick} className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${props.className}`} href={props.linkTo ? props.linkTo : '#'}>{props.title} </a>
    )
}