import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import ShareIcon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../constants/Colors';

const {height, width} = Dimensions.get('window');

const NewsDetailsScreen = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleBookmarkSave = async (item, index) => {
    try {
      const savedArticle = await AsyncStorage.getItem('savedArticle');
      let savedArticleArray = savedArticle ? JSON.parse(savedArticle) : [];

      const isArticleBookmarked = savedArticleArray.some(
        saveArticle => saveArticle.url === item.url,
      );

      if (!isArticleBookmarked) {
        savedArticleArray.push(item);
        await AsyncStorage.setItem(
          'savedArticle',
          JSON.stringify(savedArticleArray),
        );

        setIsBookmarked(true);
      } else {
        const updatedArticlesArray = savedArticleArray.filter(
          saveArticle => saveArticle.url !== item.url,
        );
        await AsyncStorage.setItem(
          'savedArticle',
          JSON.stringify(updatedArticlesArray),
        );
        setIsBookmarked(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const loadSavedArticle = async () => {
      try {
        const savedArticle = await AsyncStorage.getItem('savedArticle');
        const savedArticleArray = savedArticle ? JSON.parse(savedArticle) : [];

        const isArticleBookmarkedList = savedArticleArray.some(
          saveArticle => saveArticle.url === item.url,
        );

        setIsBookmarked(isArticleBookmarkedList);
      } catch (error) {
        console.log('error', error);
      }
    };
    loadSavedArticle();
  }, [item.url]);

  return (
    <>
      <View className="w-full flex-row justify-between items-center px-4 pt-6 pb-4 bg-white">
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
            onPress={toggleBookmarkSave}>
            <ShareIcon
              name="bookmark"
              size={24}
              color={isBookmarked ? colors.primary_blue : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* webview */}
      <WebView
        source={{uri: item.url}}
        onLoad={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible && (
        <ActivityIndicator
          size={'large'}
          color={'blue'}
          style={{
            position: 'absolute',
            top: height / 2,
            left: width / 2,
          }}
        />
      )}
    </>
  );
};

export default NewsDetailsScreen;
