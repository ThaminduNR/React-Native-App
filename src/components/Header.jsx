import {View, Text, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import {useColorScheme} from 'nativewind';
import {useNavigation} from '@react-navigation/native';
import Search from 'react-native-vector-icons/FontAwesome5';

const Header = () => {
  const navigation = useNavigation();
  const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      <View>
        <Text
          className="text-xl text-[#3867d6] dark:text-white uppercase"
          style={{fontFamily: 'Roboto-Black'}}>
          Buzz News
        </Text>
      </View>
      <View className="flex-row space-x-3 rounded-full justify-center items-center">
        <Switch
          value={colorScheme === 'dark'}
          onValueChange={toggleColorScheme}
        />
        <TouchableOpacity
          className="bg-gray-200 dark:text-white rounded-full p-2 "
          onPress={() => navigation.navigate('Search')}>
          <Search size={20} color={'#3867d6'} name="search" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
