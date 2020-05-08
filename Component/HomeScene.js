import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Button,
  Text,
  Body,
  Title,
  Label,
} from 'native-base';
import {Alert} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

const HomeScene = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signIn = () => {
    if (email == undefined || password == undefined) {
      Alert.alert('Please input every fill');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Signed in!');
        navigation.navigate('Main');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          Alert.aleart('Wrong password!!!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        if (error.code === 'auth/user-not-found') {
          Alert.alert('User not found!!');
        }

        Alert.alert(error.code);
      });
  };

  return (
    <Container>
      <Grid style={{backgroundColor: '#0F0C24'}}>
        <Row
          size={1.3}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              fontSize: 130,
              fontWeight: 'bold',
              color: '#4AD7D1',
            }}
            bold>
            WEEB
          </Text>
        </Row>
        <Row size={2} style={{paddingHorizontal: 40}}>
          <Content>
            <Item floatingLabel style={{margin: 10}}>
              <Label style={{color: 'white'}}>Email:</Label>
              <Input
                style={{color: 'white'}}
                onChangeText={eml => {
                  setEmail(eml);
                }}
              />
            </Item>
            <Item floatingLabel style={{margin: 10}}>
              <Label style={{color: 'white'}}>Password:</Label>
              <Input
                secureTextEntry
                style={{color: 'white'}}
                placeholder="Password"
                onChangeText={pwd => {
                  setPassword(pwd);
                }}
              />
            </Item>
            <Button
              onPress={signIn}
              style={{
                margin: 10,
                backgroundColor: '#4AD7D1',
              }}
              block
              dark>
              <Text style={{fontWeight: 'bold', color: '#001730'}}>
                SIGN IN
              </Text>
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('CreateAccount');
              }}
              style={{margin: 10, backgroundColor: '#4AD7D1'}}
              block
              dark>
              <Text style={{fontWeight: 'bold', color: '#001730'}}>
                CREATE ACCOUNT
              </Text>
            </Button>
          </Content>
        </Row>
      </Grid>
    </Container>
  );
};

export default HomeScene;
