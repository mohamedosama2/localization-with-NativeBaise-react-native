import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GestureDetector, Gesture, GestureHandlerRootView, GestureStateChangeEvent } from "react-native-gesture-handler";
import { PanGestureType } from "react-native-gesture-handler/lib/typescript/handlers/gestures/panGesture";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const centerX = width / 2;
const centerY = height / 2;

export const Pinch = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const style = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));
    const pan = Gesture.Pan().onChange(({ translationX, translationY }) => {
        translateX.value = translationX;
        translateY.value = translationY;
    });
    const pinch = Gesture.Pinch().onChange((event) => {
        scale.value = event.scale;
    });
    const gesture = Gesture.Race(pan, pinch);
    return (
        // <View style={styles.container}>
        <GestureHandlerRootView>
            <GestureDetector gesture={pan}>
                <Animated.View collapsable={false} style={[styles.ball, style]} />
            </GestureDetector>
        </GestureHandlerRootView>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ball: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "black",
    },
});