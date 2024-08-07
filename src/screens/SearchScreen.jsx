import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {debounce, set} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {fetchSearchNews} from '../../utils/NewsApi';
import XmarkIcon from 'react-native-vector-icons/AntDesign';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const handleSearch = async search => {
    if (search && search.length > 2) {
      setLoading(true);
      setResult([]);
      setSearchItem(search);
    }

    try {
      const data = await fetchSearchNews(search);
      setLoading(false);

      if (data && data.articles) {
        setResult(data.articles);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const [text, setText] = useState('');
  const clearText = () => {
    setText('');
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg">
        <TextInput
          placeholderTextColor={'gray'}
          placeholder="Search Here"
          onChangeText={handleTextDebounce}
          className="font-medium tracking-wider p-3 py-1 w-[90%]"
        />

        <TouchableOpacity className="pr-1" onPress={clearText}>
          <XmarkIcon size={23} color={'#3867d6'} name="closecircle" />
        </TouchableOpacity>
      </View>

      <View className="mx-4 mb-4">
        <Text
          className="text-lg dark:text-white"
          style={{
            fontFamily: 'Roboto-Black',
          }}>
          {result.length} News for {searchItem}
        </Text>
        <View className="w-[100%] mt-3 h-[2] bg-gray-200"></View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(70),
        }}>
        <NewsSection newsProps={result} label="Search Result" />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
