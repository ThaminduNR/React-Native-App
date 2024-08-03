import {
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const BreakingNewsCard = ({item, handleClick}) => {
  const {width, height} = Dimensions.get('window');

  console.log('item', item);

  const gradientColors = ['transparent', 'rgba(0, 0, 0, 0.9)'];

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View>
        <Image
          source={{
            uri: item?.urlToImage,
          }}
          style={{
            width: width - 20,
            height: 250,
            borderRadius: 15,
          }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={gradientColors}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%',
          }}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
        />

        <View className="absolute bottom-6 left-4 justify-end h-[80%]">
          <View className="space-y-1">
            <View className="max-w-[98%]">
              <Text className="text-white text-xl font-black capitalize">
                {item?.title?.length > 60
                  ? item.title.slice(0, 58) + '...'
                  : item.title.split('-')[0] || 'N/A'}
              </Text>
            </View>
            <View>
              <Text className="text-white">
                --
                {item?.author?.length > 20
                  ? item.author.slice(0, 18) + '...'
                  : item.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BreakingNewsCard;
