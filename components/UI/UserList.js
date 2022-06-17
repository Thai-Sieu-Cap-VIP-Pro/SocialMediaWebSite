import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import * as usersActions from '../../store/actions/users';
import Colors from '../../constants/Colors';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

import ENV from '../../env';
import VerifiedUser from '../../constants/VerifiedUser';

const UserList = (props) => {
    const { item, followHandler } = props;
    const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${item._id}`);

    const loggedInUserId = useSelector((state) => state.auth.user._id);
    const allUsers = useSelector((state) => state.users.allUsers);
    const loggedInUser = allUsers.filter((u) => u._id === loggedInUserId)[0];

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri);
    };

    const checkFollow = (userId) => {
        const isFollowed = loggedInUser.following.filter((f) => f._id === userId).length !== 0;
        return isFollowed;
    };

    const followUserHandler = async () => {
        if (checkFollow(item._id)) {
            followHandler(item._id);
            showMessage({
                message: `Your are already following ${item.name}.`,
                type: 'success',
                duration: 3000,
                icon: { icon: 'success', position: 'left' },
            });
        } else {
            await dispatch(usersActions.followFindPeople(item._id));
            followHandler(item._id);
            showMessage({
                message: `Your are now following ${item.name}.`,
                type: 'success',
                duration: 3000,
                icon: { icon: 'success', position: 'left' },
            });
            await dispatch(usersActions.followUser(item));
        }
    };

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('UserProfile', { userId: item._id, name: item.name })}
            style={styles.card}
        >
            <Image style={styles.userImage} source={{ uri: imageUri }} onError={onImageErrorHandler} />
            <View style={styles.cardFooter}>
                <View style={{}}>
                    <Text
                        onPress={() => navigation.navigate('UserProfile', { userId: item._id, name: item.name })}
                        style={{ ...styles.name }}
                    >
                        {item.name.length > 10 ? <>{item.name.substring(0, 10)}... </> : <>{item.name + ' '}</>}
                        {VerifiedUser.verifiedUsersId.includes(item._id) && (
                            <Octicons name="verified" size={20} color={Colors.brightBlue} />
                        )}
                    </Text>
                    <Text style={styles.position}>
                        {item.email.length > 15 ? <>{item.email.substring(0, 15)}...</> : <>{item.email}</>}
                    </Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                    <Text onPress={followUserHandler} style={styles.followButtonText}>
                        Follow
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    cardFooter: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 80,
        width: 80,
        borderRadius: 60,
        alignSelf: 'center',
        borderColor: '#DCDCDC',
        borderWidth: 3,
        backgroundColor: '#c2c2c2',
        flexShrink: 0,
    },
    name: {
        fontSize: 18,
        color: '#008080',
        fontWeight: 'bold',
    },
    position: {
        fontSize: 14,
        color: '#696969',
    },
    followButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: Colors.brightBlue,
    },
    followButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    icon: {
        height: 20,
        width: 20,
    },
});

export default UserList;
