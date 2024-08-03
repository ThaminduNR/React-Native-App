import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Search from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import CategoriesCard from '../components/CategoriesCard';
import {caregories} from '../constants';
import {fetchDiscoverNews} from '../../utils/NewsApi';
import {useQuery} from '@tanstack/react-query';
import Loading from '../components/Loading';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';

const DiscoverScreen = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [activeCategory, setActiveCategory] = useState('Business');
  const [discoverNews, setDiscoverNews] = useState([]);

  const {isLoading: isDiscoverNewsLoading, data} = useQuery({
    queryKey: ['discoverNews', activeCategory],
    queryFn: () => fetchDiscoverNews(activeCategory),
  });

  const handleCaregoryChange = category => {
    setActiveCategory(category);
    setDiscoverNews([]);
  };
  useEffect(() => {
    if (data) {
      const filteredData = data?.articles?.filter(
        article => article.title !== '[Removed]',
      );
      setDiscoverNews(filteredData || []);
    }
  }, [data]);

  useEffect(() => {
    console.log('activeCategory', activeCategory);
  }, [activeCategory]);

  return (
    <SafeAreaView className="pt-8 flex-1 bg-white dark:bg-nat">
      <StatusBar barStyle={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View>
        {/* header */}
        <View className="px-4 mb-6 justify-between">
          <Text
            className="text-2xl text-blue-500 dark:text-white"
            style={{
              fontFamily: 'Roboto-Black',
            }}>
            Discover
          </Text>
          <Text className="text-base text-gray-500 dark:text-neutral-300">
            News from all over the world
          </Text>
        </View>

        {/* search */}

        <View className="mx-4 mb-8 flex-row justify-between items-center bg-neutral-100 rounded-full px-2">
          <TouchableOpacity
            className="pl-2 pr-2"
            onPress={() => navigation.navigate('Search')}>
            <Search size={20} color={'gray'} name="search" />
          </TouchableOpacity>
          <TextInput placeholderTextColor={'gray'} placeholder="Search Here" />
        </View>

        {/* categories */}
        <View className="mx-4 flex-row">
          <CategoriesCard
            categories={caregories}
            activeCategory={activeCategory}
            handleCaregoryChange={handleCaregoryChange}
          />
        </View>

        <View className="h-full">
          {/* Header Title */}
          <View className="m-4 flex-row justify-between items-center">
            <Text
              className="text-xl dark:text-white "
              style={{fontFamily: 'Roboto-Black'}}>
              Discover
            </Text>
            <Text
              className="text-gray-700 dark:text-white"
              style={{fontFamily: 'Roboto-Regular'}}>
              View All
            </Text>
          </View>

          {isDiscoverNewsLoading ? (
            <Loading />
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: hp(70),
              }}>
              <NewsSection label="Discover" newsProps={discoverNews} />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
