import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import { ReportComponent } from '../pages/report';
import * as redux from 'react-redux'
jest
  .spyOn(redux, 'useSelector')
  .mockReturnValueOnce({role: 'user'})
  .mockReturnValueOnce({role: 'admin'})

describe('Report page', () => {
    it('should render properly for normal user', function () {
        jest.clearAllMocks();
        const wrap = shallow(<ReportComponent />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })

    it('should render properly for Admin', function () {
        jest.clearAllMocks();
        const wrap = shallow(<ReportComponent />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
