import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import BreakingNewsCard from './BreakingNewsCard';
import Carousel from 'react-native-reanimated-carousel';

const BreakingNews = ({label, data}) => {
  const {width: screenWidth} = Dimensions.get('window');
  const itemWidth = screenWidth * 8;
  const sliderWidth = screenWidth;

  const navigation = useNavigation();

  const handleClick = item => {
    console.log('item', item);

    navigation.navigate('NewsDetails', item);
  };
  const filteredData = data?.filter(item => item.urlToImage !== null);

  return (
    <View className="items-center w-[100%]">
      <Carousel
        loop={true}
        width={screenWidth - 30}
        autoPlay={true}
        data={filteredData}
        scrollAnimationDuration={6000}
        renderItem={({item}) => (
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        style={styles.container}
      />
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    height: 250,
    borderRadius: 15,
  },
});
