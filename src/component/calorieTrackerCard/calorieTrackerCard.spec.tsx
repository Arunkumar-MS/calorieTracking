import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import { CalorieTrackerCard } from './index';
import * as reduxWrapper from '@Store/hooks';

jest
    .spyOn(reduxWrapper, 'useAppSelector')
    .mockReturnValueOnce([{ "consumedCalories": 123 }, { "consumedCalories": 134 }, { "consumedCalories": 35 }])
    .mockReturnValueOnce(200)


describe('CalorieTrackerCard page', () => {
    it('should render properly', function () {
        const wrap = shallow(<CalorieTrackerCard />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
