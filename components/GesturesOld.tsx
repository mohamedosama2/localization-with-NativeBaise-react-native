import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withDecay,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { clamp, withBouncing } from 'react-native-redash';

// import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface GestureProps {
  width: number;
  height: number;
}

const GesturesAnimation = ({ width, height }: GestureProps) => {
  const boundX = width - 100;
  const boundY = height - 100;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      offsetX: number;
      offsetY: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateX.value = withBouncing(
        withDecay({
          velocity: velocityX,
        }),
        0,
        boundX,
      );
      translateY.value = withBouncing(
        withDecay({
          velocity: velocityY,
        }),
        0,
        boundY,
      );
    },
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
      // left: translateX.value,
      // top: translateY.value,
    };
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <View >
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View {...{ style }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'blue',
              }}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default GesturesAnimation;
