import {Alert, Linking} from 'react-native';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';
import {store, updateStatus, updateSteps} from '../../redux';

export const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};

export const firePermissionRequest = () => {
  GoogleFit.authorize(options)
    .then(authResult => {
      if (authResult.success) {
        console.log('AUTH_SUCCESS');

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
              showAlert();
            }
          })
          .catch(error => {
            console.log(error);
            Alert.alert('Error verifying GoogleFit status!');
          });
      } else {
        showAlert();
      }
    })
    .catch(() => {
      Alert.alert('Error verifying GoogleFit status!');
    });
};

export const verifyAuthStatus = () => {
  return new Promise((resolve, reject) => {
    GoogleFit.checkIsAuthorized()
      .then(() => {
        if (GoogleFit.isAuthorized) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        reject();
      });
  });
};

export const fetchStepCount = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 2); //subtract one day

  const opt = {
    startDate: startDate.toISOString(), // required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
    bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  // GoogleFit.getDailySteps(new Date())
  GoogleFit.getDailyStepCountSamples(opt)
    .then(res => {
      console.log('Daily steps >>> ', res, res?.[0]?.rawSteps?.[0]?.steps);
      if (res?.[0]?.rawSteps?.[0]?.steps) {
        store.dispatch(updateSteps(res?.[0]?.rawSteps?.[0]?.steps));
      } else {
        store.dispatch(updateSteps(0));
      }
    })
    .catch(err => {
      console.warn(err);
    });
};

export const openAppSettings = () => {
  Linking.openSettings();
};

export const showAlert = () => {
  Alert.alert(
    'Permissions not given',
    'Please allow the app to read data from GoogleFit',
    [{text: 'Cancel'}, {text: 'Retry', onPress: () => firePermissionRequest()}],
  );
};
