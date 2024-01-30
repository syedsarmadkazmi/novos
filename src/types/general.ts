import { HealthStatusCode } from "react-native-health"

export enum EAppState {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    BACKGROUND = 'background',
}

export enum EHealthStatusCode {
    NotDetermined = 0,
    SharingDenied = 1,
    SharingAuthorized = 2,
}