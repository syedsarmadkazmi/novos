import {Button, View, AppState, ImageBackground} from 'react-native';
import {styles} from './styles';

import {useEffect} from 'react';

import { IS_IOS, firePermissionRequest, openAppSettings } from '../../utils'
import { useHealthSelector } from '../../redux';
import { StepsCount } from '../../components';
import { EAppState } from '../../types';
import { BG_IMAGE } from '../../assets';

export const Health = () => {
  useEffect(() => {
    if(!IS_IOS) firePermissionRequest()

    const subscription = AppState.addEventListener('change', nextAppState => {
      if(nextAppState === EAppState.ACTIVE && IS_IOS) {
        firePermissionRequest()
      }
    });

    return () => {
      subscription.remove();
    }
        
  }, []);

  function handleRefresh(){
    firePermissionRequest()
  }

  const {steps} = useHealthSelector()

  return (
    <View style={styles.container}>
      <ImageBackground source={BG_IMAGE} style={styles.image}>
        <StepsCount steps={steps} />
        <Button
          title="Refresh"
          onPress={handleRefresh}
        />
        {IS_IOS && 
          <Button
            title="Open Settings"
            onPress={openAppSettings}
          />
        }
      </ImageBackground>
    </View>
  );
};
