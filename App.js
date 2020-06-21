/* eslint-disable radix */
import React, {useState, useEffect} from 'react';
import {Picker} from 'react-native';

import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding: 15px;
`;

const HeaderText = styled.Text`
  font-size: 30px;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  height: 80px;
  font-size: 24px;
  padding: 20px;
  flex: 1;
`;

const InputText = styled.Text`
  padding: 20px;
  font-size: 24px;
  color: #ccc;
`;

const InputContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
  background-color: #eee;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const ResultArea = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 10px;
`;

const ResultItemTitle = styled.Text`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
`;

const ResultItemValue = styled.Text`
  font-size: 20px;
`;

const SeparateItem = styled.View`
  width: 100%;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const LineSeparate = styled.View`
  width: 100%;
  border: 1px solid #eee;
`;

const Bold = styled.Text`
  font-weight: 900;
`;

const PickerSelect = styled.Picker`
  height: 50px;
  width: 100px;
  border: 1px solid #000;
`;

const Circle = styled.View`
  background-color: #00f300;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  position: absolute;
  right: 108px;
  top: 6px;
  width: 40px;
  height: 30px;
`;

const Green = styled.Text`
  color: #fff;
  font-size: 15px;
`;

export default () => {
  const options = [
    {
      key: parseInt(Math.random() * 1),
      porcent: 5,
      label: '5%',
    },
    {
      key: parseInt(Math.random() * 1),
      porcent: 10,
      label: '10%',
    },
    {
      key: parseInt(Math.random() * 1),
      porcent: 15,
      label: '15%',
    },
    {
      key: parseInt(Math.random() * 1),
      porcent: 20,
      label: '20%',
    },
  ];

  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);
  const [indexValue, setIndexValue] = useState(1);
  const [porcent, setPorcent] = useState(options[indexValue].label);

  //Substitui o ponto '.' pela vígula ','
  function Comma(value) {
    let string = value.toString();

    let newValue = string.replace('.', ',');

    return newValue;
  }

  return (
    <Container>
      <HeaderText>Gorjeta</HeaderText>
      <Circle>
        <Green>{porcent}</Green>
      </Circle>

      <InputContainer>
        <InputText>R$</InputText>
        <Input
          placeholder="Quanto deu a conta?"
          keyboardType="numeric"
          value={bill}
          onChangeText={n => {
            setBill(parseFloat(Comma(n)));
            setTip((options[indexValue].porcent / 100) * parseFloat(n));
          }}
        />
      </InputContainer>
      <PickerSelect
        selectedValue={porcent}
        onValueChange={(itemValue, itemIndex) => {
          // eslint-disable-next-line no-lone-blocks
          setTip((options[itemIndex].porcent / 100) * bill);
          setIndexValue(itemIndex);
          setPorcent(options[itemIndex].label);
        }}>
        {options.map(item => (
          <PickerSelect.Item
            key={item.key}
            label={item.label}
            value={item.label}
          />
        ))}
      </PickerSelect>
      <ResultArea>
        <SeparateItem>
          <ResultItemTitle>Valor da conta</ResultItemTitle>
          <ResultItemValue>
            <Bold>
              R$ {bill > 0 ? Comma(parseFloat(bill).toFixed(2)) : '----'}
            </Bold>
          </ResultItemValue>
        </SeparateItem>

        <LineSeparate />

        <SeparateItem>
          <ResultItemTitle>Valor da gorjeta</ResultItemTitle>
          <ResultItemValue>
            <Bold>R$ {bill > 0 ? Comma(tip.toFixed(2)) : '----'}</Bold>
          </ResultItemValue>
        </SeparateItem>

        <LineSeparate />

        <SeparateItem>
          <ResultItemTitle>Valor total</ResultItemTitle>
          <ResultItemValue>
            <Bold>
              R${' '}
              {bill > 0 ? Comma((parseFloat(bill) + tip).toFixed(2)) : '----'}
            </Bold>
          </ResultItemValue>
        </SeparateItem>
      </ResultArea>
    </Container>
  );
};
