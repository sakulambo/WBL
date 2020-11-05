import React, {useState} from 'react';
import { View, Text, TextInput, ViewPagerAndroidBase, SafeAreaView  } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { styles } from '../../styles/style.js'

const dice = {
  1: require('../../assets/dice/dice_1.png'),
  2: require('../../assets/dice/dice_2.png'),
  3: require('../../assets/dice/dice_3.png'),
  4: require('../../assets/dice/dice_4.png'),
  5: require('../../assets/dice/dice_5.png'),
  6: require('../../assets/dice/dice_6.png'),
}

const Dices = () => {
  const route = useRoute();
  const [value, onChangeText] = useState('');

  // console.log(route)
  return (
    <SafeAreaView>
      <View style={styles.inputDiceContainer}>
        <View>
          <Text>Nº of dices</Text>
          <TextInput
          keyboardType={'number-pad'}
          style={styles.numberInputDice}
          />
      </View>
      <View>
        <Text>Nº of faces</Text>
        <TextInput
        keyboardType={'number-pad'}
        style={styles.numberInputDice}
        />
      </View>
    </View>
      
  </SafeAreaView>
  )
}

export default Dices;
