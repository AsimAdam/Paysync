import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError, ErrorCodes, handleError } from '../utils/errorHandling';

// storageService.ts
//
// Singleton service for managing persistent storage of user profile data using AsyncStorage.
//
// Exports:
// - UserProfile interface: Type definition for user profile objects.
// - StorageService singleton: Provides methods to save, retrieve, and clear user profile data.
//
// Notes:
// - Handles errors using a custom error handler for consistent error management.
// - Designed for React Native apps requiring persistent user data.

export interface UserProfile {
    name: string;
    avatarIndex: number;
}

class StorageService {
    private static instance: StorageService;
    private readonly USER_PROFILE_KEY = 'userProfile';

    private constructor() {}

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }
        return StorageService.instance;
    }

    public async saveUserProfile(profile: UserProfile): Promise<void> {
        try {
            await AsyncStorage.setItem(
                this.USER_PROFILE_KEY,
                JSON.stringify(profile)
            );
        } catch (error) {
            throw handleError(error);
        }
    }

    public async getUserProfile(): Promise<UserProfile | null> {
        try {
            const profile = await AsyncStorage.getItem(this.USER_PROFILE_KEY);
            return profile ? JSON.parse(profile) : null;
        } catch (error) {
            throw handleError(error);
        }
    }

    public async clearUserProfile(): Promise<void> {
        try {
            await AsyncStorage.removeItem(this.USER_PROFILE_KEY);
        } catch (error) {
            throw handleError(error);
        }
    }
}

export default StorageService.getInstance(); 