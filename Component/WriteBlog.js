import React, {useState, useEffect} from 'react';
// import uniqueId from 'react-native-unique-id';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
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
  Input,
  Item,
  Textarea,
  Label,
} from 'native-base';
import {Alert, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Row, Col, Grid} from 'react-native-easy-grid';

const WriteBlog = ({navigation}) => {
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [score, setScore] = useState();
  const [review, setReviewMessage] = useState();

  const handleChoosePhoto = () => {
    // const options = {
    //   noData: true,
    // };
    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.uri) {
    //     setImage(response);
    //   }
    // });
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        setImage(source);
      }
    });
  };

  const createBlog = () => {
    if (
      title == undefined ||
      price == undefined ||
      score == undefined ||
      review == undefined ||
      image == undefined
    ) {
      Alert.alert('Please fill every field');
      return;
    }
    if (isNaN(score) || isNaN(score)) {
      Alert.alert('score and price should be number');
      return;
    }

    if (score > 10) {
      Alert.alert('Maximum score is 10');
      return;
    }

    const uniqueId = require('react-native-unique-id');
    let user = auth().currentUser;
    uniqueId()
      .then(id => {
        let path = '/reviews/' + title + '_' + id;
        database()
          .ref(path)
          .set({
            title,
            price,
            score,
            review,
            image,
            reviewer: user.displayName,
          })
          .then(() => navigation.navigate('Main'))
          .catch(error => Alert.alert(error.code));
      })
      .catch(error => Alert.alert(error.code));
    navigation.navigate('Main');
  };

  return (
    <Container>
      <Header style={{backgroundColor: '#0F0C24'}}>
        <Left>
          <Button transparent onPress={() => navigation.navigate('Main')}>
            <Icon name="arrow-back" style={{color: '#4AD7D1'}} />
            <Text style={{color: '#4AD7D1'}}>Back</Text>
          </Button>
        </Left>
        <Body>
          <Text style={{color: '#4AD7D1'}}>Write new review</Text>
        </Body>
        <Right>
          <Button transparent onPress={createBlog}>
            <Icon type="FontAwesome" name="pencil" style={{color: '#4AD7D1'}} />
          </Button>
        </Right>
      </Header>
      <Content
        style={{
          backgroundColor: '#0F0C24',
          paddingStart: 30,
          paddingEnd: 40,
          paddingTop: 30,
        }}
        padder>
        <Grid>
          <Row style={{alignItems: 'center', marginTop: 30}}>
            <Col size={1} style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Title
              </Text>
            </Col>
            <Col size={4}>
              <Item rounded style={{backgroundColor: 'white'}}>
                <Input
                  onChangeText={ti => setTitle(ti)}
                  style={{fontSize: 20}}
                />
              </Item>
            </Col>
          </Row>
          <Row style={{alignItems: 'center', marginTop: 30}}>
            <Col size={1} style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Price
              </Text>
            </Col>
            <Col size={2}>
              <Item rounded style={{backgroundColor: 'white'}}>
                <Input
                  onChangeText={pr => setPrice(pr)}
                  style={{fontSize: 20, textAlign: 'center'}}
                />
              </Item>
            </Col>
            <Col size={2} style={{paddingStart: 15}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Baht
              </Text>
            </Col>
          </Row>
          <Row style={{alignItems: 'center', marginTop: 30}}>
            <Col size={1} style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Score
              </Text>
            </Col>
            <Col size={1}>
              <Item rounded style={{backgroundColor: 'white'}}>
                <Input
                  onChangeText={sc => setScore(sc)}
                  style={{fontSize: 20, textAlign: 'center'}}
                />
              </Item>
            </Col>
            <Col size={3} style={{paddingStart: 15}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                / 10
              </Text>
            </Col>
          </Row>
          <Row
            style={{
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Col size={1} style={{alignItems: 'center'}}>
              <Text
                style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
                Image
              </Text>
            </Col>
            <Col size={4} style={{paddingStart: 15}}>
              <Text
                onPress={handleChoosePhoto}
                style={{alignSelf: 'flex-start'}}>
                {image ? (
                  <Image
                    source={{uri: image.uri}}
                    style={{width: 250, height: 250}}
                  />
                ) : (
                  <Icon
                    type="FontAwesome"
                    name="photo"
                    style={{color: 'white', fontSize: 50}}
                  />
                )}
              </Text>
            </Col>
          </Row>
          <Row style={{alignItems: 'center', marginTop: 30}}>
            <Text style={{fontSize: 20, color: '#4AD7D1', fontWeight: 'bold'}}>
              Review Message
            </Text>
          </Row>
          <Row style={{alignSelf: 'stretch'}}>
            <Item
              style={{backgroundColor: 'white', flex: 1, padding: 3}}
              rounded>
              <Textarea
                rowSpan={5}
                onChangeText={re => {
                  setReviewMessage(re);
                }}
                style={{flex: 1}}
              />
            </Item>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default WriteBlog;
