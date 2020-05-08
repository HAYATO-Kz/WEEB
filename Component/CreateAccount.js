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
  Label,
} from 'native-base';
import {Alert} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

const HomeScene = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  const createAccount = () => {
    if (email == undefined || password == undefined || username == undefined) {
      Alert.alert('Please input every fill');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const update = {
          displayName: username,
        };

        auth()
          .currentUser.updateProfile(update)
          .then(() => {
            Alert.alert('User account created & signed in!');
            navigation.navigate('Main');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.aleart('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
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
                placeholder="Email"
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
            <Item floatingLabel style={{margin: 10}}>
              <Label style={{color: 'white'}}>Display Name:</Label>
              <Input
                style={{color: 'white'}}
                onChangeText={usr => {
                  setUsername(usr);
                }}
              />
            </Item>
            <Button
              onPress={createAccount}
              style={{margin: 10, backgroundColor: '#4AD7D1'}}
              block
              dark>
              <Text style={{fontWeight: 'bold', color: '#001730'}}>
                CREATE ACCOUNT
              </Text>
            </Button>
            <Row style={{justifyContent: 'center', marginVertical: 8}}>
              <Text style={{color: 'white'}}>
                Already have account?{' '}
                <Text
                  style={{color: '#4AD7D1'}}
                  onPress={() => {
                    navigation.navigate('Home');
                  }}>
                  sign in!
                </Text>
              </Text>
            </Row>
          </Content>
        </Row>
      </Grid>
    </Container>
  );
};

export default HomeScene;
