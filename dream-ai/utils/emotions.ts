export const emotions = {
    joy: '#FFD700', // Gold
    sadness: '#1E90FF', // Dodger Blue
    fear: '#FF4500', // Orange Red
    anger: '#DC143C', // Crimson
    surprise: '#FF69B4', // Hot Pink
    disgust: '#32CD32', // Lime Green
    trust: '#4682B4', // Steel Blue
    anticipation: '#FFA500', // Orange
    calm: '#00FA9A', // Medium Spring Green
    boredom: '#A9A9A9', // Dark Gray
    love: '#FF1493', // Deep Pink
    curiosity: '#8A2BE2', // Blue Violet
  };
  
  export type EmotionType = keyof typeof emotions;
  
  export const getEmotionColor = (emotion: EmotionType): string => {
    return emotions[emotion] || '#808080'; // Default to neutral gray if emotion is not found
  };
  