import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import AdminFoodEditForm from './index';


describe('AdminFoodEditForm page', () => {
    it('should render properly', function () {
        const wrap = shallow(<AdminFoodEditForm type='add' onClose={() => { }} />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
