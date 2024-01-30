import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
  } from 'react-native-health';
import { IS_IOS } from './global';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';

const firePermissionRequest = () => {
    if(IS_IOS) {
        const permissions = {
            permissions: {
              read: [AppleHealthKit.Constants.Permissions.Steps],
              write: [AppleHealthKit.Constants.Permissions.Steps],
            },
          } as HealthKitPermissions;

        AppleHealthKit.initHealthKit(permissions, (error: string) => {
            /* Called after we receive a response from the system */

            console.log('apple healthkit function called ', error, permissions);
            if (error) {
            console.log('[ERROR] Cannot grant permissions!');
            }

            /* Can now read or write to HealthKit */

            const options = {
            startDate: new Date(2020, 1, 1).toISOString(),
            };

            AppleHealthKit.getHeartRateSamples(
            options,
            (callbackError: string, results: HealthValue[]) => {
                console.log('results ', results, callbackError);
                /* Samples are now collected from HealthKit */
            },
            );
        });
    }

    //for android
    else {
        const options = {
            scopes: [
              Scopes.FITNESS_ACTIVITY_READ,
              Scopes.FITNESS_ACTIVITY_WRITE,
              Scopes.FITNESS_BODY_READ,
              Scopes.FITNESS_BODY_WRITE,
            ],
          }
        GoogleFit.authorize(options)
        .then(authResult => {
          console.log('authResult ', authResult)
          if (authResult.success) {
            console.log("AUTH_SUCCESS");
          } else {
            console.log("AUTH_DENIED", authResult.message);
          }
        })
        .catch(() => {
          console.log("AUTH_ERROR");
        })
    }
}