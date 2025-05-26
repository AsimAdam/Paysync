import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface AvatarSelectorProps {
    avatars: any[];
    selectedAvatar: number | null;
    onSelectAvatar: (index: number) => void;
    containerStyle?: ViewStyle;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
    avatars,
    selectedAvatar,
    onSelectAvatar,
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {avatars.map((avatar, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.avatarWrapper,
                        selectedAvatar === index && styles.selectedAvatar,
                    ]}
                    onPress={() => onSelectAvatar(index)}
                >
                    <Image source={avatar} style={styles.avatar} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    avatarWrapper: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: wp('10%'),
        padding: wp('2%'),
        margin: wp('2%'),
    },
    selectedAvatar: {
        borderColor: '#3D3EAA',
        borderWidth: 3,
    },
    avatar: {
        width: wp('15%'),
        height: wp('15%'),
        borderRadius: wp('7.5%'),
    },
});

export default AvatarSelector; 