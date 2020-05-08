import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Right,
  Header,
  Text,
  Item,
  Input,
  Grid,
  Button,
  Icon,
  Left,
} from 'native-base';
import {Row} from 'react-native-easy-grid';
import {Image, View} from 'react-native';

const MainPage = ({navigation}) => {
  const [reviewData, setReviewData] = useState();
  const [defaultData, setDefaultData] = useState();
  useEffect(() => {
    const subscriber = database()
      .ref(`/reviews`)
      .on('value', snapshot => {
        let receivceData = [];
        snapshot
          ? snapshot.forEach(child => {
              let childData = child.val();
              childData.id = child.key;
              receivceData.push(childData);
            })
          : (receivceData = null);
        setReviewData(receivceData);
        setDefaultData(receivceData);
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  const searchHandle = search => {
    if (search == '') {
      setReviewData(defaultData);
    } else {
      database()
        .ref(`/reviews`)
        .orderByChild('title')
        .startAt(search)
        .endAt(search + '\uf8ff')
        .on('value', snapshot => {
          let receivceData = [];
          snapshot
            ? snapshot.forEach(child => {
                let childData = child.val();
                childData.id = child.key;
                receivceData.push(childData);
              })
            : (receivceData = null);
          setReviewData(receivceData);
        });
    }
  };

  return (
    <Container style={{backgroundColor: '#0F0C24'}}>
      <Header style={{backgroundColor: '#0F0C24'}}>
        <Right>
          <Button
            transparent
            onPress={() => {
              navigation.navigate('Write');
            }}>
            <Icon type="AntDesign" name="edit" style={{color: '#4AD7D1'}} />
          </Button>
        </Right>
      </Header>
      <Grid>
        <Content>
          <Item
            rounded
            style={{marginStart: 10, marginEnd: 10, marginVertical: 10}}>
            <Icon name="ios-search" style={{color: 'white'}} />
            <Input
              style={{color: 'white'}}
              placeholder="Search"
              onChangeText={txt => searchHandle(txt)}
            />
          </Item>
          <View>
            {reviewData ? (
              reviewData.map(child => {
                const {title, price, score, image, reviewer, id} = child;
                return (
                  <Card
                    style={{
                      marginStart: 10,
                      marginEnd: 10,
                      marginVertical: 10,
                    }}>
                    <CardItem
                      button
                      style={{backgroundColor: '#4AD7D1'}}
                      onPress={() => {
                        navigation.navigate('Review', {
                          id,
                        });
                      }}>
                      <Left>
                        <Image
                          style={{height: 230, width: 170}}
                          source={{uri: image.uri}}
                          resizeMode="stretch"
                        />
                      </Left>
                      <Body>
                        <Row
                          style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 25,
                              color: '#001730',
                            }}>
                            {title}
                          </Text>
                        </Row>
                        <Row
                          style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                          }}>
                          <Text>{price} Baht</Text>
                        </Row>
                        <Row
                          style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                          }}>
                          <Text>{score} / 10</Text>
                        </Row>
                        <Row
                          style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                          }}>
                          <Text>Reviewer: {reviewer}</Text>
                        </Row>
                      </Body>
                    </CardItem>
                  </Card>
                );
              })
            ) : (
              <Text>Didn't have any review yet.</Text>
            )}
          </View>
        </Content>
      </Grid>
    </Container>
  );
};

export default MainPage;
