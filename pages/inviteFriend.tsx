import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from 'next/router'
import withAuth from "src/authHoc";
import { AddUser, createUser } from "@Service/user";
import getUnixTime from "date-fns/getUnixTime";
import Spinner from "@Component/spinner";
import { DEFAULT_CALORIES_LIMIT } from "src/constant/config";


const InviteFriendComponent = () => {
    const router = useRouter()
    const [isLoading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [user, setUser] = React.useState<Partial<AddUser | null>>(null);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data: Partial<AddUser>) => {
        setLoading(true);
        const req = {
            ...data,
            createdDate: getUnixTime(new Date()),
            calorieLimit: DEFAULT_CALORIES_LIMIT,
            role: 'user',
        } as AddUser;

        createUser(req)
            .then((res) => {
                if (res.data.status && res.data.status === 406) {
                    setError(res.data.message);
                } else {
                    setUser({ name: req.name, token: res.data.token });
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError('Something went wrong please try later!');
            });
    };


    const getFormRegisterPropsForString = (name: string) => {
        return {
            ...register(name, {
                required: true,
                maxLength: 150,
                pattern: /^[A-Za-z0-9 _]+$/i
            })
        }
    }

    const getFormRegisterPropsForEmail = (name: string) => {
        return {
            ...register(name, {
                required: true,
                maxLength: 2045,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/i
            })
        }
    }

    const copy = () => {
        navigator.clipboard.writeText(user?.token || '');
    }


    return (
        <div className="py-16 sm:py-24 flex justify-center">
            <div className="relative sm:py-16 md:w-2/4" >
                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
                        <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
                                <path className="text-indigo-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
                                <path className="text-indigo-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
                            </svg>
                        </div>
                        {!user && (<div className="relative">
                            <div className="text-xl  md:text-2xl text-center font-semibold   antialiased text-white">
                                Invite youre friend
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col">
                                    <div className="">
                                        <input {...getFormRegisterPropsForString("name")} type="text" className="mt-10 block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Enter Name" />
                                        {errors['name'] && <span className="flex items-center font-medium tracking-wide text-red-400 text-xs mt-1 ml-1">
                                            {`Please enter valid name!`}
                                        </span>}
                                        <input  {...getFormRegisterPropsForEmail("emailId")} type="email" className="mt-5 mb-5 block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Enter email id" />
                                        {errors['emailId'] && <span className="flex items-center font-medium tracking-wide text-red-400 text-xs mt-1 ml-1 mb-2">
                                            {`Please enter valid email id!`}
                                        </span>}
                                    </div>
                                    <div className="flex justify-center">
                                        <button disabled={isLoading} type="button" onClick={() => router.back()} className="block w-full mr-2 md:mr-8 md:w-80 rounded-md border border-transparent py-1 px-5 md:py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">Go back</button>
                                        <button disabled={isLoading} type="submit" className="block w-full ml-2 md:w-80 rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">Invite</button>
                                    </div>
                                    {isLoading && <Spinner />}
                                </div>
                            </form>
                            {error &&
                                <div className=" text-center mt-5">
                                    <div className="text-gray-300  font-medium">{error}</div>
                                </div>
                            }
                        </div>)
                        }
                        {user && (
                            <div className="relative">
                                <div className="flex flex-col text-center text-xl  md:text-2xl font-semibold   antialiased text-white">
                                    <div>
                                        {`Share below toekn with youre friend ${user?.name}`}
                                    </div>
                                    <p className="mt-5 mb-5 italic text-gray-100 break-all	text-sm	">
                                        {user?.token}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button type="button" onClick={() => router.back()} className="block w-full mr-2 md:mr-8 md:w-80 rounded-md border border-transparent py-1 px-5 md:py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">Cancel</button>
                                    <button type="button" onClick={copy} className="block w-full ml-2 md:w-80 rounded-md border border-transparent px-5 py-3 bg-indigo-800 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">Copy to clipboard</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


const InviteFriend = withAuth(InviteFriendComponent, ['admin', 'user']);
export default InviteFriend;
