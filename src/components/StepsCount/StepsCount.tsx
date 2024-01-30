import {Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {calcPercent} from '../../utils';
import {styles} from './styles';

const goal = 5000;

export const StepsCount = ({steps}) => {
  const fill = calcPercent(steps, goal);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={180}
        width={10}
        fill={fill}
        tintColor="#00e0ff"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#3d5875"
        duration={1000}
        delay={500}
        style={styles.progress}>
        {() => <Text style={styles.stepsText}>{fill}</Text>}
      </AnimatedCircularProgress>

      <Text style={styles.label}>
        Your Current Steps Count: <Text style={styles.stepsText}>{steps}</Text>
      </Text>
      <Text style={styles.label}>
        Daily Goal: <Text style={styles.stepsText}>{goal}</Text>
      </Text>
    </View>
  );
};
