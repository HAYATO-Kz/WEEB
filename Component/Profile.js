import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
  Container,
  Content,
  Header,
  Icon,
  Text,
  Left,
  Button,
  Right,
  List,
  ListItem,
} from 'native-base';
import {Row, Grid} from 'react-native-easy-grid';

const Profile = ({navigation}) => {
  const [favoriteData, setFavoriteData] = useState();
  const user = auth().currentUser;

  useEffect(() => {
    let path = `/users/` + user.uid;
    database()
      .ref(path)
      .on('value', snapshot => {
        if (snapshot != undefined) {
          if (snapshot.exists) {
            let data = [];
            snapshot.forEach(child => {
              console.log(child.key);
              if (child != undefined) {
                data.push(child.key);
              }
            });
            console.log(data);
            setFavoriteData(data);
          }
        }
      });
  }, [user.uid]);

  return (
    <Container>
      <Header style={{backgroundColor: '#0F0C24'}}>
        <Right>
          <Button
            onPress={() => {
              auth().signOut();
              navigation.navigate('Home');
            }}
            transparent>
            <Text style={{color: '#4AD7D1'}}>SIGN OUT</Text>
          </Button>
        </Right>
      </Header>
      <Content
        style={{
          backgroundColor: '#0F0C24',
          paddingStart: 30,
          paddingEnd: 40,
          paddingTop: 30,
        }}>
        <Grid>
          <Row style={{justifyContent: 'center', marginBottom: 20}}>
            <Text style={{fontSize: 30, color: '#4AD7D1', fontWeight: 'bold'}}>
              {user.displayName}
            </Text>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginBottom: 10}}>
            <Text style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
              Email: {user.email}
            </Text>
          </Row>
          <Row style={{justifyContent: 'flex-start', marginBottom: 20}}>
            <Text style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
              Password: {'*******'}
            </Text>
          </Row>
          <Row>
            {favoriteData ? (
              <List
                style={{
                  backgroundColor: '#4AD7D1',
                  flex: 1,
                  paddingEnd: 20,
                  paddingBottom: 20,
                }}>
                <ListItem>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    My favorite review
                  </Text>
                </ListItem>
                {favoriteData.map(post => (
                  <ListItem
                    style={{backgroundColor: '#001730', padding: 10}}
                    button
                    onPress={() => {
                      navigation.navigate('Review', {id: post});
                    }}>
                    <Left>
                      <Text style={{color: 'white'}}>{post.split('_')[0]}</Text>
                    </Left>
                    <Right>
                      <Icon style={{color: 'white'}} name="arrow-forward" />
                    </Right>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text>No favorite review</Text>
            )}
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default Profile;
