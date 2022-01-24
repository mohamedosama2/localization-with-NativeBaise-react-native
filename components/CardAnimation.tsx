import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { clamp, withBouncing } from 'react-native-redash';

const { width, height } = Dimensions.get('window')
const CARD_WIDTH = 200;
const CARD_HEIGHT = 75;
const boundX = width - CARD_WIDTH
const boundY = height - CARD_HEIGHT
const CardAnimation = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const style = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }, { translateY: translateY.value }] }))
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { ctx: number, cty: number }>({
        onStart: (_, context) => {
            context.ctx = translateX.value;
            context.cty = translateY.value;
        },
        onActive: ({ translationX, translationY }, context) => {
            translateX.value = clamp(translationX + context.ctx, 0, boundX)
            translateY.value = clamp(translationY + context.cty, 0, boundY)
        },
        onEnd: ({ velocityX, velocityY }) => {
            translateX.value = withBouncing(withDecay({ velocity: velocityX }), 0, boundX)
            translateY.value = withBouncing(withDecay({ velocity: velocityY }), 0, boundY)
        }
    })
    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler {...{ onGestureEvent }}>
                <Animated.View {...{ style }}>
                    <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 20, backgroundColor: 'green' }}></View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default CardAnimation;

const styles = StyleSheet.create({
    container: { flex: 1 }
});
