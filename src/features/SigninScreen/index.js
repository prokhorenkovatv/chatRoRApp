import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { WebClientID } from 'constants';
import { useDispatch } from 'react-redux';
import { saveUser, saveToken } from 'state/user';
import { wp, hp } from 'utils/ui';

GoogleSignin.configure({
  webClientId: WebClientID,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  accountName: '',
});

const SignInScreen = () => {
  const dispatch = useDispatch();

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name, first_name, last_name, picture.type(large)',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('Login Info has an error:', error);
        } else {
          dispatch(
            saveUser({
              name: `${result.name}`,
              picture: `${result.picture.data.url}`,
            }),
          );
          console.log('result:', result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('login canceled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            dispatch(saveToken(accessToken));
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('login fail with error: ' + error);
      },
    );
  };

  loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(saveToken(userInfo.idToken));
      dispatch(
        saveUser({
          name: `${userInfo.user.name}`,
          picture: `${userInfo.user.photo}`,
        }),
      );
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Image source={require('assets/planet.png')} style={styles.logo} />
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          onPress={loginWithFacebook}
          style={[styles.loginButton, styles.fbButton]}
        >
          <Text style={styles.fbText}>Login with facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton, styles.googleButton]}
          onPress={loginWithGoogle}
        >
          <Text>Login with google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 50,
    alignItems: 'center',
  },
  welcome: {
    fontSize: hp(6),
    textTransform: 'uppercase',
    marginBottom: hp(5),
  },
  btnWrapper: {
    flex: 1,
  },
  logo: {
    width: wp('50%'),
    height: hp('50%'),
    resizeMode: 'contain',
    flex: 1,
    marginBottom: hp(5),
  },
  loginButton: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  fbButton: { backgroundColor: '#3b5998' },
  googleButton: { borderStyle: 'solid', borderWidth: 1, borderColor: 'grey' },
  fbText: { color: '#fff' },
});
