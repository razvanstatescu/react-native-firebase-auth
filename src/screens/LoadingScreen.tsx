import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { SET_USER } from '../store/user/user.actions'

interface Props {
  navigation?: any
  setUser: Function
}

class LoadingScreen extends Component<Props> {
  componentDidMount() {
    this.checkIfLoggedIn()
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setUser(user)

        this.props.navigation.navigate('DashboardScreen')
      } else {
        this.props.navigation.navigate('LoginScreen')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch({ type: SET_USER, user }),
  }
}

export default connect(null, mapDispatchToProps)(LoadingScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
