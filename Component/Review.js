import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Button,
  Icon,
  Text,
  Right,
} from 'native-base';
import {Image, Alert} from 'react-native';
import {Row, Grid} from 'react-native-easy-grid';

const Review = ({route, navigation}) => {
  const [star, setStar] = useState(false);
  const [data, setData] = useState();
  const {id} = route.params;

  useEffect(() => {
    let user = auth().currentUser;
    let path = `/reviews/` + id;
    let pathWid = '/users/' + user.uid + '/' + id;
    database()
      .ref(path)
      .once('value')
      .then(snapshot => {
        if (snapshot != undefined) {
          let receivceData = snapshot.val();
          setData(receivceData);
        }
      });
    const subscriber = database()
      .ref(pathWid)
      .on('value', snapshot => {
        if (snapshot != undefined) {
          if (snapshot.exists()) {
            setStar(true);
          } else {
            setStar(false);
          }
        }
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [id]);

  const likeHandle = () => {
    let user = auth().currentUser;
    let pathWOid = '/users/' + user.uid;
    let pathWid = pathWOid + '/' + id;
    database()
      .ref(pathWid)
      .once('value')
      .then(function(snapshot) {
        if (snapshot.exists()) {
          database()
            .ref(pathWOid)
            .remove()
            .then(() => {
              setStar(false);
            });
        } else {
          database()
            .ref(pathWid)
            .set({favorite: true})
            .then(() => {
              setStar(true);
            })
            .catch(error => Alert.alert(error.code));
        }
      });
  };

  return (
    <Container>
      {data ? (
        <Header style={{backgroundColor: '#0F0C24'}}>
          <Left>
            <Button transparent onPress={() => navigation.navigate('Main')}>
              <Icon name="arrow-back" style={{color: '#4AD7D1'}} />
              <Text style={{color: '#4AD7D1'}}>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={{color: '#4AD7D1'}}>{data.title}</Text>
          </Body>
          <Right>
            <Button transparent onPress={likeHandle}>
              {star ? (
                <Icon type="AntDesign" name="star" style={{color: '#4AD7D1'}} />
              ) : (
                <Icon
                  type="AntDesign"
                  name="staro"
                  style={{color: '#4AD7D1'}}
                />
              )}
            </Button>
          </Right>
        </Header>
      ) : (
        <Header style={{backgroundColor: '#0F0C24'}}>
          <Left>
            <Button
              onPress={() => {
                navigation.navigate('Main');
              }}>
              <Text style={{color: '#4AD7D1'}}>Back</Text>
            </Button>
          </Left>
        </Header>
      )}
      {data ? (
        <Content
          style={{
            backgroundColor: '#0F0C24',
            paddingStart: 30,
            paddingEnd: 40,
            paddingTop: 30,
          }}
          padder>
          <Grid>
            <Row style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={{width: 250, height: 300}}
                source={{uri: data.image.uri}}
              />
            </Row>
            <Row style={{alignItems: 'center', marginVertical: 30}}>
              <Text
                style={{fontSize: 40, color: '#4AD7D1', fontWeight: 'bold'}}>
                {data.title}
              </Text>
            </Row>
            <Row>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                {data.review}
              </Text>
            </Row>
            <Row style={{alignItems: 'center', marginTop: 30}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Price: {data.price} baht
              </Text>
            </Row>
            <Row style={{alignItems: 'center', marginTop: 30}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Score: {data.score}/10
              </Text>
            </Row>
            <Row style={{alignItems: 'center', marginTop: 30}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Reviwer: {data.reviewer}
              </Text>
            </Row>
          </Grid>
        </Content>
      ) : (
        <Content
          style={{
            backgroundColor: '#0F0C24',
            paddingStart: 30,
            paddingEnd: 40,
            paddingTop: 30,
          }}
          padder>
          <Text style={{color: '#4AD7D1', fontSize: 50}}>No Data</Text>
        </Content>
      )}
    </Container>
  );
};

export default Review;
