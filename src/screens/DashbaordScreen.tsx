import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { getUserDisplayName } from '../store/user/user.selectors'

interface Props {
  user?: any
}

export const UserDetails = ({ user }) => {
  if (user) {
    return <Text>{user.displayName}</Text>
  } else {
    return <Text>No User</Text>
  }
}

class DashboardScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
        <UserDetails user={this.props.user}></UserDetails>
        <Button title="Log out" onPress={() => firebase.auth().signOut()} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: getUserDisplayName(state),
  }
}

export default connect(mapStateToProps)(DashboardScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
