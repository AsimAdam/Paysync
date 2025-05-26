import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { avatars } from '../assets/avatars';

interface UserProfile {
  userName: string | null;
  userAvatar: any | null;
}

// useUserProfile.ts
//
// Custom React hook for retrieving the current user's profile information (name and avatar) from AsyncStorage.
//
// Returns:
// - userName: The user's name (string or null)
// - userAvatar: The user's avatar object (from assets) or null
//
// Notes:
// - Designed for use in React Native apps with persistent user profiles.
// - Reads from AsyncStorage keys: 'userName' and 'selectedAvatar'.
// - Avatar is resolved from the imported avatars array.

export function useUserProfile(): UserProfile {
  const [userName, setUserName] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const avatarIndex = await AsyncStorage.getItem('selectedAvatar');
        setUserName(name);
        const idx = avatarIndex !== null ? parseInt(avatarIndex, 10) : NaN;
        if (!isNaN(idx) && idx >= 0 && idx < avatars.length) {
          setUserAvatar(avatars[idx]);
        } else {
          setUserAvatar(null);
        }
      } catch (error) {
        setUserName(null);
        setUserAvatar(null);
      }
    };
    fetchProfileData();
  }, []);

  return { userName, userAvatar };
} 