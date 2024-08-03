import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StatusBar, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {useColorScheme} from 'nativewind';
import {fetchBreakingNews, fetchRecommendedNews} from '../../utils/NewsApi';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MiniHeader from '../components/MiniHeader';
import BreakingNews from '../components/BreakingNews';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';

const HomeScreen = () => {
  const colorScheme = useColorScheme(); // Adjusted to handle single return value
  //const [breakingNews, setBreakingNews] = useState([]);
  // const [recommendedNews, setRecommendedNews] = useState([]);

  //breaking news query
  const {isLoading: isBreakingNewsLoading, data: breakingNews} = useQuery({
    queryKey: ['breakingNews'],
    queryFn: fetchBreakingNews,
  });

  //recommended news query
  const {isLoading: isRecommendedNewsLoading, data: recommendedNews} = useQuery(
    {
      queryKey: ['recommendedNews'],
      queryFn: fetchRecommendedNews,
    },
  );

  return (
    <SafeAreaView>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
      {isBreakingNewsLoading ? (
        <Loading />
      ) : (
        <View>
          <MiniHeader label="Breaking News" />
          <BreakingNews label="Breaking News" data={breakingNews?.articles} />
        </View>
      )}
      <View className="top-[260]">
        <MiniHeader label="Recommended News" />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: hp(80),
          }}>
          {isRecommendedNewsLoading ? (
            <Loading />
          ) : (
            <NewsSection
              label="Recommendation"
              newsProps={recommendedNews?.articles}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
