import React from "react";
import { MenuItem } from "./menuItem";
import { useRouter } from 'next/router';
import cookies from "js-cookie";
import {
    useAppSelector,
} from '@Store/hooks';
import { selectUser } from "@Reducers/userSlice/userSlice";
import Link from "next/link";

export const Menu = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();
    const user = useAppSelector(selectUser);

    const isAdmin = user.role == 'admin';

    const signOut = () => {
        cookies.remove('token');
    }

    const renderMenuItems = () => {
        return (
            <>
                <Link href="/report">
                    <MenuItem title="View report" dataTestId='menu-view-report' />
                </Link>
                {isAdmin && <Link href="/manageFoodEntry">
                    <MenuItem title="Manage food entries" dataTestId='menu-manage-food-entries' />
                </Link>}
                <Link href="/inviteFriend">
                    <MenuItem title="Invite a friend" dataTestId='menu-invite-friend' />
                </Link>

                <MenuItem linkTo={`${window.location.origin}/login`} title={<span className="flex md:flex-col text-center"> <span className="hidden md:block"> {`Hi! ${user.name}`}</span> <span className="md:text-xs" data-test-id="menu-sign-out"> Sign out</span></span>} onClick={signOut} />
            </>
        )
    }

    return (
        <>
            <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center cursor-pointer" onClick={() => router.push('./')}>
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 bg-white rounded-lg" src="./logo.svg" alt="Workflow" />
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-4 md:flex md:items-center md:ml-6">
                        {renderMenuItems()}
                    </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        {!isOpen && <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        }
                        {isOpen && <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        }
                    </button>
                </div>
            </div>
            {isOpen && <div className="bg-gray-800  w-full	z-10 absolute focus:outline-none border-b border-gray-700 md:hidden" id='mobile-menu'>
                <div className="flex flex-col px-2 py-3 space-y-1 sm:px-3">
                    {renderMenuItems()}
                </div>
            </div>
            }
        </>
    );
}