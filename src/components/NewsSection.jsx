import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Bookmark from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsSection = ({newsProps}) => {
  const navigation = useNavigation();

  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);

  const handelClick = item => {
    navigation.navigate('NewsDetails', item);
  };

  //bookmark save function
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

        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        const updatedArticlesArray = savedArticleArray.filter(
          saveArticle => saveArticle.url !== item.url,
        );
        await AsyncStorage.setItem(
          'savedArticle',
          JSON.stringify(updatedArticlesArray),
        );

        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const urlArray = newsProps.map(item => item.url);
    setUrlList(urlArray);
  }, [newsProps]);

  useFocusEffect(
    useCallback(() => {
      const loadSavedArticle = async () => {
        try {
          const savedArticle = await AsyncStorage.getItem('savedArticle');
          const savedArticleArray = savedArticle
            ? JSON.parse(savedArticle)
            : [];

          const isArticleBookmarkedList = urlList.map(url =>
            savedArticleArray.some(saveArticle => saveArticle.url === url),
          );

          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log('error', error);
        }
      };
      loadSavedArticle();
    }, [urlList, navigation]),
  );

  //const filteredData = newsProps?.filter(item => item.urlToImage !== null);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handelClick(item)}>
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <Image
            source={{
              uri: item.urlToImage || 'https://picsum.photos/350/300',
            }}
            style={{
              width: hp(9),
              height: hp(10),
            }}
          />
          {/* content */}
          <View className="w-[70%] justify-center space-y-1 pl-4">
            {/* author */}
            <Text className="text-xs font-mono text-gray-800 dark:text-neutral-300">
              {item?.author?.length > 20
                ? item.author.slice(0, 18) + '...'
                : item.author}
            </Text>
            {/* Title */}
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white"
              style={{fontSize: hp(1.7), fontFamily: 'Roboto-Bold'}}>
              {item?.title?.length > 60
                ? item.title.slice(0, 58) + '...'
                : item.title.split('-')[0] || 'N/A'}
            </Text>
            {/* Date */}
            <Text className="text-xs text-gray-500 dark:text-neutral-300">
              {item.publishedAt}
            </Text>
          </View>
          <View className="w-[10%] justify-center">
            <TouchableOpacity onPress={() => toggleBookmarkSave(item, index)}>
              <Bookmark
                name="bookmark"
                color={bookmarkStatus[index] ? 'blue' : 'gray'}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900">
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default NewsSection;
