import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Vibration,
  Platform,
  Alert,
} from 'react-native';

import { showMessage } from 'react-native-flash-message';
import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';


import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const AuthScreen = (props) => {
  const [isSignup, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState({});

  const dispatch = useDispatch();
  let token;
  let _notificationSubscription;

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Failed !',
          'Failed to get push token for push notification!',
          [{ text: 'Okay' }]
        );
        return;
      }
      try {
        token = await Notifications.getExpoPushTokenAsync();
      } catch (err) {
        showMessage({
          message: `ERROR - ${err.message}`,
          description: `${err}`,
          type: 'danger',
          icon: { icon: 'danger', position: 'left' },
          duration: 3000,
        });
      }
      console.log(token);
      setExpoPushToken(token);
    } else {
      Alert.alert(
        'Error !',
        'Must use physical device for Push Notifications',
        [{ text: 'Okay' }]
      );
    }
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
    console.log(expoPushToken);
    _notificationSubscription = Notifications.addListener(_handleNotification);
  }, []);

  const _handleNotification = (notification) => {
    Vibration.vibrate();
    setNotification(notification);
  };

  const validateAuthForm = () => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /\d/;
    if (isSignup && !name) {
      showMessage({
        message: 'Please enter a valid name.',
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 3000,
      });
      setIsLoading(false);
      return false;
    }
    if (isSignup && name && name.length < 2) {
      showMessage({
        message: 'Please enter a valid name.',
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 3000,
      });
      setIsLoading(false);
      return false;
    }
    if (!emailRegex.test(email.toLowerCase())) {
      showMessage({
        message: 'Please enter a valid email.',
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 3000,
      });
      setIsLoading(false);
      return false;
    }
    if (!password || password.length === 0) {
      showMessage({
        message: 'Please enter your password.',
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 3000,
      });
      setIsLoading(false);
      return false;
    }
    if (isSignup && password.length < 6) {
      showMessage({
        message: 'Password should be atleast 6 characters long.',
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 3000,
      });
      setIsLoading(false);
      return false;
    }
    if (isSignup && !passwordRegex.test(password)) {
      showMessage({
        message: 'Password should contain atleast 1 number.',
        type: 'danger',
        icon: { icon: 'danger', position: 'left' },
        duration: 3000,
      });
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const AuthHandler = async () => {
    setIsLoading(true);
    if (validateAuthForm()) {
      if (isSignup) {
        try {
          const msg = await dispatch(
            authActions.signup(name, email, password, expoPushToken)
          );
          showMessage({
            message: 'Signup Success',
            description: 'Please Login !',
            type: 'success',
            icon: { icon: 'success', position: 'left' },
            duration: 3000,
          });
          setIsSignUp(false);
          setName('');
          setEmail('');
          setPassword('');
        } catch (error) {
          showMessage({
            message: error.message,
            type: 'danger',
            icon: { icon: 'danger', position: 'left' },
            duration: 3000,
          });
        }
        setIsLoading(false);
      } else {
        try {
          await dispatch(authActions.signin(email, password, expoPushToken));
          showMessage({
            message: 'Signed in success',
            type: 'success',
            icon: { icon: 'success', position: 'left' },
            duration: 3000,
          });
        } catch (error) {
          showMessage({
            message: error.message,
            type: 'danger',
            icon: { icon: 'danger', position: 'left' },
            duration: 3000,
          });
          setIsLoading(false);
        }
      }
    }
  };

  const inputChangeHandler = (text, inputField) => {
    if (inputField === 1) {
      setName(text);
    } else if (inputField === 2) {
      setEmail(text);
    } else if (inputField === 3) {
      setPassword(text);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.bgImage} source={require('../../assets/blue-bg.jpg')} /> */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{isSignup ? 'Sign up' : 'Sign in'}</Text>
      </View>

      {/* { error !== null && (
                    <View style={styles.errorMsgContainer} >
                        <Image style={styles.msgIcon} source={{ uri: "https://i.imgur.com/GnyDvKN.png" }} />
                        <Text style={styles.msgText}> {error} </Text>
                    </View>
                )} */}

      {isSignup && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Name"
            underlineColorAndroid="transparent"
            value={name}
            onChangeText={(text) => inputChangeHandler(text, 1)}
          />
          <Image
            style={styles.inputIcon}
            source={{ uri: 'https://img.icons8.com/nolan/40/000000/name.png' }}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          value={email}
          onChangeText={(text) => inputChangeHandler(text, 2)}
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={(text) => inputChangeHandler(text, 3)}
        />
        <Image
          style={styles.inputIcon}
          source={{ uri: 'https://i.ibb.co/VQ1wXzW/visible.png' }}
        />
      </View>

      <TouchableOpacity
        onPress={() => props.navigation.navigate('ForgotPassword')}
        style={styles.btnForgotPassword}
      >
        <Text style={styles.btnText}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={AuthHandler}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginText}>
            {isSignup ? 'Register' : 'Login'}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.registerButton]}
        onPress={() => {
          setIsSignUp((prevState) => !prevState);
        }}
      >
        <Text style={styles.btnTextMore}>
          {isSignup
            ? 'Already a user ? Login'
            : "Don't have an account ? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Auth',
  };
};

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginTop: 20,
    marginBottom: 60,
    width: 400,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },

  errorMsgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D8000C',
    backgroundColor: '#FFBABA',
    color: '#D8000C',
    borderRadius: 25,
  },
  successMsgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#4F8A10',
    backgroundColor: '#DFF2BF',
    color: '#4F8A10',
    borderRadius: 25,
  },
  msgText: {
    fontSize: 15,
  },
  msgIcon: {
    width: 30,
    height: 30,
    // marginLeft: 15,
    justifyContent: 'center',
  },

  inputContainer: {
    // borderBottomColor: '#F5FCFF',
    backgroundColor: Colors.grayColor,
    borderRadius: 15,
    // borderBottomWidth: 1,
    width: 330,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 15,
    backgroundColor: 'transparent',
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: Colors.primary,

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  registerButton: {
    backgroundColor: Colors.lightPrimary,

    shadowColor: '#808080',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.primary,
    fontWeight: 'normal',
  },
  btnTextMore: {
    color: "white",
    fontWeight: 'normal',
  }
});

export default AuthScreen;
