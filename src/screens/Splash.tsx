import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Splash = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('CreateProfile');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image 
          source={require('../assets/title.png')} 
          style={styles.logo}
        />
        <Text style={styles.description}>
          Track with ease and clarity. Whether you're budgeting for everyday 
          expenses, saving for future goals, or analyzing spending habits, 
          manage it all in one place.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.1, 
  },
  logo: {
    width: width * 0.6, 
    height: height * 0.2,
    marginBottom: height * 0.02,
    resizeMode: 'contain',
  },
  description: {
    fontSize: width * 0.045,
    color: '#666',
    textAlign: 'left',
    lineHeight: height * 0.03,
    marginTop: 5,
  },
});

export default Splash;
