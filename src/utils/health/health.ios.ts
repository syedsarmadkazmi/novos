import {Alert, Linking} from 'react-native';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import {store, updateStatus, updateSteps} from '../../redux';
import {EHealthStatusCode} from '../../types';

export const options = {
  permissions: {
    read: [AppleHealthKit?.Constants?.Permissions?.Steps],
    write: [AppleHealthKit?.Constants?.Permissions?.Steps],
  },
} as HealthKitPermissions;

export const firePermissionRequest = () => {
  AppleHealthKit.initHealthKit(options, (error: string) => {
    /* Called after we receive a response from the system */
    if (error) {
      Alert.alert('[ERROR] Cannot grant permissions!');
    }

    /* Can now read or write to HealthKit */
    verifyAuthStatus()
      .then(results => {
        store.dispatch(updateStatus(results));

        if (results) {
          //retrieve step count
          fetchStepCount();
        } else {
          //reset the steps count
          store.dispatch(updateSteps(0));

          //generate an alert dialog allowing users to modify permissions via settings
          showAlert()
        }
      })
      .catch(error1 => {
        console.log(error1);
        Alert.alert('Error verifying HealthKit status!');
      });
  });
};

export const verifyAuthStatus = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.getAuthStatus(options, (err, results) => {
      if (err) {
        Alert.alert('Error verifying HealthKit status!');
        reject(err);
      } else {
        if (
          results &&
          results?.permissions?.read?.[0] ===
            (EHealthStatusCode.SharingAuthorized as number)
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

export const fetchStepCount = () => {
  const options = {
    startDate: new Date(2024, 1, 1).toISOString(),
  };
  AppleHealthKit.getStepCount(options, (err: Object, results: HealthValue) => {
    if (err) {
      return;
    }
    store.dispatch(updateSteps(results?.value));
  });
};

export const openAppSettings = () => {
  Linking.openURL('App-Prefs:Privacy&path=HEALTH/NOVOS');
};

export const showAlert = () => {
  Alert.alert(
    'Permissions not given',
    'Please allow the app to read data from HealthKit',
    [
      {text: 'Cancel'},
      {text: 'Open Settings', onPress: () => openAppSettings()},
    ],
  );
};