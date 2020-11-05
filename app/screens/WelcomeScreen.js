import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationActions } from '@react-navigation/native';


import colors from "../config/colors";

const navigateToScreen = (route) => () => {
    console.log(route)
    const navigationAction = NavigationActions.navigate({
        routeName: route
    })
    this.props.navigation.dispatch(navigationAction)
}

function WelcomeScreen() {
    return (
      <ImageBackground
      style={styles.background}
      >  
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={{uri:"https://www.belloflostsouls.net/wp-content/uploads/2019/04/Warhammer-Logo.jpg"}}></Image>
        <Text style={styles.headerText}>Warhammer Black List</Text>
      </View>  
      <TouchableWithoutFeedback onPress={() => this.navigateToScreen('WarscrollScreen')}>
        <View style={styles.loginButton}>
            <Text>Login</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.registerButton}>
            <Text>Register</Text>
        </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        backgroundColor: colors.black
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#F5F5F5',
    },
    logo: {
        width: 100,
        height: 100
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems:'center'
    },
    registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: colors.secondary,
        borderWidth: 1,
        borderLeftColor: colors.secondary,
        borderRightColor: colors.secondary,
        borderBottomColor: colors.secondary,
        borderColor: colors.border_primary
    },
    
}

)

export default WelcomeScreen;