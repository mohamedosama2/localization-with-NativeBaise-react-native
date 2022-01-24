import React from 'react';
import { Box, Button, Center, useColorMode } from 'native-base';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'


export default function Test() {
    const { colorMode, toggleColorMode } = useColorMode()
    // const { colors, fonts } = useTheme()
    // console.log(colors, fonts)
    const animation = useSharedValue(0)
    const style = useAnimatedStyle(() => ({ opacity: animation.value }))
    return (
        <Center flex={1} fontSize="2xl" _dark={{ bg: 'brand.800' }} _light={{ bg: 'brand.900' }}>
            <Center rounded={"lg"} h={"20"} w="20" bg={"brand.700"} fontFamily="heading.300" fontWeight={"bold"} >
                {colorMode} sskssssssss
            </Center>
            <Center h={"10%"} rounded="full" my="5" w="20%" _dark={{ bg: 'white' }} _light={{ bg: 'blueGray.200' }}>
                <Animated.Text {...{ style }}>Hello</Animated.Text>
            </Center>
            <Box
                bg={{
                    linearGradient: {
                        colors: ['lightBlue.300', 'violet.800'],
                        start: [0, 0],
                        end: [1, 0],
                    },
                }}
                p="12"
                rounded="lg"
                _text={{ fontSize: 'md', fontWeight: 'bold', color: 'white' }}
            >
                This is a Box with Linear Gradient
            </Box>
            <Button mt={"10"} colorScheme='yellow' onPress={toggleColorMode}>Toggle</Button>
            <Button mt={"10"} colorScheme='yellow' onPress={() => animation.value = withTiming(animation.value === 1 ? 0 : 1, { duration: 300 })}>Animation</Button>
        </Center>

    );
}
