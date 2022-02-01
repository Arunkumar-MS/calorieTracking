import React from 'react';
import { CalorieTrackerCard } from 'src/component/calorieTrackerCard';
import {
  useAppSelector,
} from '@Store/hooks';
import { selectFoodEntryList } from '@Reducers/foodDetailsSlice/foodDetailsSlice';
import FoodEntryList from '@Component/foodEntryList';

const UserFlow = () => {
  const list = useAppSelector(selectFoodEntryList)
  return (
    <div className='md:flex md:justify-between'>
      <div className='md:w-2/12'>
        <CalorieTrackerCard className='md:sticky md:top-0'/>
      </div>
      <FoodEntryList list={list} />
    </div>
  )
}

export default UserFlow;