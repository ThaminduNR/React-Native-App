import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const gradientColors = ['transparent', 'rgba(0, 90, 150, 0.9)'];
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1">
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
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1.5}}
        />
        <View className="flex-1 justify-end items-center max-w-[85%] space-y-4">
          <Text
            className=" shadow-2xl text-white text-center tracking-wider"
            style={{fontFamily: 'Roboto-Black', fontSize: wp(10)}}>
            Stay Informed from Day One !
          </Text>
          <Text
            className="text-white text-center max-w-[80%]"
            style={{fontFamily: 'Roboto-Regular', fontSize: wp(4)}}>
            Discover the latest news and breaking news from around the world.
          </Text>
          <TouchableOpacity
            className="bg-blue-500 rounded-full justify-center items-center w-[360px] mt-8 mb-3 p-4"
            style={{fontFamily: 'Roboto-Regular', fontSize: wp(4)}}
            onPress={() => navigation.navigate('HomeTabs')}>
            <Text className="text-base text-white">Getting Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
