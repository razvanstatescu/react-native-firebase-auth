import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import * as Google from 'expo-google-app-auth'
import firebase from 'firebase'
import { firebaseIosClientId } from '../config/firebase'

class LoginScreen extends Component {
  /**
   *  Check if two firebase users are equal
   * @param googleUser
   * @param firebaseUser
   */
  isUserEqual = (
    googleUser: Google.GoogleUser,
    firebaseUser: Google.GoogleUser
  ) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true
        }
      }
    }
    return false
  }

  /**
   * Process the Firebase Google Sign in request
   * If new user, add to firestore
   * @param googleUser
   */
  onSignIn = (googleUser: any) => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((firebaseUser: any) => {
        unsubscribe()
        // Check if already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          const credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          )

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((user) => {
              // Check if new user and insert in firestore
              if (user.additionalUserInfo?.isNewUser)
                firebase
                  .firestore()
                  .collection('users')
                  .doc(user.user?.uid)
                  .set({
                    email: user.user?.email,
                    picture: user.user?.photoURL,
                    displayName: user.user?.displayName,
                    first_name: user.additionalUserInfo?.profile?.given_name,
                  })
              else
                firebase
                  .firestore()
                  .collection('users')
                  .doc(user.user?.uid)
                  .update({
                    last_login: Date.now(),
                  })
            })
        }
      })
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: firebaseIosClientId,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        this.onSignIn(result)
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Sign in with Google"
          onPress={this.signInWithGoogleAsync}
        />
      </View>
    )
  }
}
export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
