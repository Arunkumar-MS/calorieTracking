import React from 'react';

interface Props {
    title: string;
    onClick: (e:any) => void;
    className?: string;
}

export const MenuItem = (props: Props) => {
    return (
        <a onClick={props.onClick} className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${props.className}`}>{props.title} </a>
    )
}