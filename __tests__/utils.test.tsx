
import { openAppSettings, showAlert } from '../src/utils';

describe('React Modules Functions', () => {
  
    // Linking
    it('should open app settings', async () => {
        const mockOpenURL = jest.fn();
        jest.mock('react-native/Libraries/Linking/Linking', () => ({
        openURL: mockOpenURL,
        }));

        // function call
        openAppSettings();

        // checking if Linking.openURL is called with the correct URL
        expect(mockOpenURL).toHaveBeenCalledWith('App-Prefs:Privacy&path=HEALTH/NOVOS');
    });

  
    // Alert
    it('should show alert and open settings on button press', async () => {
        const mockAlert = jest.fn();
        jest.mock('react-native/Libraries/Alert/Alert', () => ({
        alert: mockAlert,
        }));

        // function call
        showAlert();

        // checking if Alert.alert is called with the correct arguments
        expect(mockAlert).toHaveBeenCalledWith(
        'Permissions not given',
        'Please allow the app to read data from HealthKit',
        [
            { text: 'Cancel' },
            { text: 'Open Settings', onPress: expect.any(Function) },
        ],
        );
    });
});
