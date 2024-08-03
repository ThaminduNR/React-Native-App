import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import ShareIcon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';

const NewsDetailsScreen = () => {
  const navigation = useNavigation();
  const[isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmarkandSave = () => {};

  return (
    <>
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon name="chevron-back" size={23} color={'gray'} />
          </TouchableOpacity>
        </View>

        <View className="space-x-4 rounded-full items-center justify-center flex-row">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <ShareIcon name="share-social" size={24} color={'gray'} />
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-100 p-2 rounded-full"
            onPress={toggleBookmarkandSave}>
            <ShareIcon
              name="bookmark"
              size={24}
              color={isBookmarked ? 'blue' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* webview */}
      <WebView/>
      <Text>NewsDetailsScreen</Text>
    </>
  );
};

export default NewsDetailsScreen;
