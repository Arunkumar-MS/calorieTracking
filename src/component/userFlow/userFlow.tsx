import React from 'react';
import { CalorieTrackerCard } from 'src/component/calorieTrackerCard';
import {
  useAppDispatch,
} from '@Store/hooks';

const UserFlow = () => {
  const dispatch = useAppDispatch();
 
  return (
    <div className='md:flex md:justify-between'>
      <div className='md:w-2/12'>
        <CalorieTrackerCard />
      </div>
      <div className="md:w-10/12 mt-2 md:m-2 md:mt-0">
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
      </div>
    </div>
  )
}

export default UserFlow;