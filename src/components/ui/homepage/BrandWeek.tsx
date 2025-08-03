import { View, Text, Animated, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { images2 } from 'src/screens/Home/demo';
import { LinearGradient } from 'expo-linear-gradient';
import { verticalScale } from 'react-native-size-matters';
const { width } = Dimensions.get("screen");

const BrandWeek = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<ScrollView>(null);
    const scrollRef2 = useRef<ScrollView>(null);
    const indexRef = useRef(0);
    const indexRef2 = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);

    const handleScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        indexRef.current = index;
        setCurrentIndex(index);
    };

    const handleScroll2 = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        indexRef2.current = index;
        setCurrentIndex(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % images2.length;
            scrollRef2.current?.scrollTo({ x: nextIndex * width, animated: true });
            setCurrentIndex(nextIndex);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);
    return (
        <View>
            <Text className="text-3xl text-center text-[#fff] mt-5 mb-2 font-playFairDisplay">
                Brand of the week
            </Text>

            {/* Progress Indicator */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 5 }}>
                {images2.map((_, i) => (
                    <View
                        key={i}
                        style={{
                            width: i === currentIndex ? 20 : 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: i === currentIndex ? '#fff' : '#888',
                            marginHorizontal: 3,
                        }}
                    />
                ))}
            </View>

            <Animated.ScrollView
                ref={scrollRef2}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {/* ==== REPLACE THIS WITH THE NEW MAPPING ==== */}
                {images2.map((item, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const translateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [-20, 0, 20],
                    });

                    return (
                        <View key={index} style={{ width, height: verticalScale(180), overflow: 'hidden' }}>
                            <Animated.Image
                                source={item.image}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    transform: [{ translateX }],
                                }}
                                resizeMode="contain"
                            />

                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.7)']}
                                style={{ position: 'absolute', bottom: 0, width: '100%', height: 60 }}
                            />

                            <Text
                                style={{
                                    position: 'absolute',
                                    bottom: 15,
                                    width: '100%',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    textShadowColor: index === currentIndex ? '#fff' : 'transparent',
                                    textShadowOffset: { width: 0, height: 0 },
                                    textShadowRadius: index === currentIndex ? 10 : 0,
                                }}
                            >
                                {item.name}
                            </Text>
                        </View>
                    );
                })}
            </Animated.ScrollView>

        </View>
    )
}

export default BrandWeek