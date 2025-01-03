import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

interface GestureContext extends Record<string, unknown> {
  startX: number; // Include specific property along with the index signature.
}

interface CardSwiperProps {
  cards: Array<{
    id: string;
    component: React.ComponentType;
  }>;
}

export function CardSwiper({ cards }: CardSwiperProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const translateX = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value; // Properly initialize the context.
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = event.translationX > 0 ? -1 : 1;
        const newIndex = Math.max(0, Math.min(currentIndex + direction, cards.length - 1));
        setCurrentIndex(newIndex);
      }
      translateX.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const CurrentCard = cards[currentIndex]?.component;

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {CurrentCard && <CurrentCard />}
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
