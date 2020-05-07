import React, {Component, useState} from 'react';
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
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Alert} from 'react-native';

const App = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [BMI, setBMI] = useState('HI,MASTER');
  const [bodyStatus, setBodyStatus] = useState('');

  const calculateBMI = () => {
    if (isNaN(height) || isNaN(weight)) {
      Alert.alert('Please input the numbe only!!!');
      return;
    }
    let bmiNum = (weight / height ** 2) * 10000;
    setBMI('Your BMI is ' + bmiNum.toFixed(2));
    if (bmiNum < 22) {
      setBodyStatus('Under weight');
    } else if (bmiNum < 30) {
      setBodyStatus('Healthy');
    } else {
      setBodyStatus('Obese');
    }
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>BMI CALCULATOR</Title>
        </Body>
      </Header>
      <Grid>
        <Row size={1}>
          <Col>
            <Row
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                }}>
                {BMI}
              </Text>
            </Row>
            <Row
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlignVertical: 'center',
                  textAlign: 'center',
                }}>
                {bodyStatus}
              </Text>
            </Row>
          </Col>
        </Row>
        <Row size={5} style={{paddingHorizontal: 50}}>
          <Content>
            <Item regular style={{margin: 10}}>
              <Input
                placeholder="Height"
                onChangeText={height => {
                  setHeight(height);
                }}
              />
            </Item>
            <Item regular style={{margin: 10}}>
              <Input
                placeholder="Weight"
                onChangeText={weight => {
                  setWeight(weight);
                }}
              />
            </Item>
            <Button onPress={calculateBMI} block dark>
              <Text>CALCULATE</Text>
            </Button>
          </Content>
        </Row>
      </Grid>
    </Container>
  );
};

export default App;
