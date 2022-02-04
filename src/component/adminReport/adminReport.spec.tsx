import { jest } from '@jest/globals'
import { shallowToJson } from "enzyme-to-json";
import * as React from 'react';
import { shallow } from 'enzyme';
import AdminReport from './index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch
}));


jest.mock("swr", () => ({
    __esModule: true,
    namedExport: jest.fn(),
    default: () => ({
        data: { "avgCalForLastSevendays": [{ "date": "02:02:2022", "value": 839.6300000000001 }, { "date": "01:02:2022", "value": 1508.3500000000001 }, { "date": "03:02:2022", "value": 11737.93 }, { "date": "29:01:2022", "value": 303.4 }, { "date": "30:01:2022", "value": 189 }, { "date": "31:01:2022", "value": 210.5 }], "lastSevenDaysEntries": 83, "weekBeforeLastSevenDaysEntries": 7 },
    }),
}));

describe('AdminReport page', () => {
    it('should render properly', function () {
        const wrap = shallow(<AdminReport />)
        expect(shallowToJson(wrap)).toMatchSnapshot();
    })
})
