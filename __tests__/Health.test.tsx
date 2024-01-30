import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Health } from '../src/screens';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

//utils mock
const utilsPath = '../src/utils'
jest.mock(utilsPath, () => ({
    ...jest.requireActual(utilsPath),
    firePermissionRequest: jest.fn(),
  }));
const utilsMock = require(utilsPath);

//store mock
const initialState = {
    health: {
        steps: 100,
        active: true
    }
};
type RootState = typeof initialState;
const mockStore = configureStore<RootState>();


describe('Novos health application', () => {
    let store;
    let component;

    beforeEach(() => {
        store = mockStore(initialState);
        utilsMock.IS_IOS = false;
        utilsMock.firePermissionRequest.mockClear();
        component = render(<Provider store={store}><Health /></Provider>);
    });

    test('app renders correctly', () => {
        const { getByText } = component;
        expect(getByText('Refresh')).toBeTruthy();
    });

    test('fires permission request on component mount', () => {
        utilsMock.IS_IOS = true;
        expect(utilsMock.firePermissionRequest).toHaveBeenCalledTimes(1);
    });

    test('fires permission request on Refresh button press', () => {
        const { getByText } = component;
        fireEvent.press(getByText('Refresh'));
        expect(utilsMock.firePermissionRequest).toHaveBeenCalledTimes(2);
    });

    test('renders "Open Settings" button on iOS platforms', () => {
        utilsMock.IS_IOS = true;
        const { getByText } = render(<Provider store={store}><Health /></Provider>);
        expect(getByText('Open Settings')).toBeTruthy();
    });
});