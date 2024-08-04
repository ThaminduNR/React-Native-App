import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    onLayoutRoot();
  }, []);

  const onLayoutRoot = useCallback(async () => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);
  });

  const gradientColors = [
    'rgba(56, 103, 214, 0.75)',
    'rgba(56, 103, 214, 0.75)',
  ];

  return (
    <ImageBackground
      source={require('../../src/assets/images/splash-img.jpg')}
      className="flex-1 justify-center items-center">
      <LinearGradient
        colors={gradientColors}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
      />
      <View onLayout={onLayoutRoot}>
        <Text style={styles.mainText} className="text-white">
          Buzz News
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainText: {
    fontFamily: 'Roboto-Black',
    fontSize: 50,
  },
});
