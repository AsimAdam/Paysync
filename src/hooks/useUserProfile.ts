import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { avatars } from '../assets/avatars';

interface UserProfile {
  userName: string | null;
  userAvatar: any | null;
}

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