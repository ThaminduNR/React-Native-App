import {View, Text} from 'react-native';
import React from 'react';

const MiniHeader = ({label}) => {
  return (
    <View className="px-4 my-5 justify-between flex-row items-center">
      <Text
        className="text-[#3867d6] text-lg dark:text-white"
        style={{
          fontFamily: 'Roboto-Bold',
        }}>
        {label}
      </Text>
      <Text
        className="text-gray-500 dark:text-white"
        style={{fontFamily: 'Roboto-Regular'}}>
        View All
      </Text>
    </View>
  );
};

export default MiniHeader;
