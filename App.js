import React, {useState} from 'react';
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

export default () => {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(0);

  //Substitui o ponto '.' pela vígula ','
  function Comma(value) {
    let string = value.toString();

    let newValue = string.replace('.', ',');

    return newValue;
  }

  return (
    <Container>
      <HeaderText>Gorjeta</HeaderText>

      <InputContainer>
        <InputText>R$</InputText>
        <Input
          placeholder="Quanto deu a conta?"
          keyboardType="numeric"
          value={bill}
          onChangeText={n => {
            setBill(n);
            setTip(parseFloat(n) * 0.1);
          }}
        />
      </InputContainer>

      <ResultArea>
        <SeparateItem>
          <ResultItemTitle>Valor da conta</ResultItemTitle>
          <ResultItemValue>
            <Bold>R$ {bill !== '' ? Comma(parseFloat(bill).toFixed(2)) : '----'}</Bold>
          </ResultItemValue>
        </SeparateItem>

        <LineSeparate />

        <SeparateItem>
          <ResultItemTitle>Valor da gorjeta</ResultItemTitle>
          <ResultItemValue>
            <Bold>R$ {bill !== '' ? Comma(tip.toFixed(2)) : '----'}</Bold>
          </ResultItemValue>
        </SeparateItem>
        <LineSeparate />
        <SeparateItem>
          <ResultItemTitle>Valor total</ResultItemTitle>
          <ResultItemValue>
            <Bold>R$ {bill !== '' ? Comma((parseFloat(bill) + tip).toFixed(2)) : '----'}</Bold>
          </ResultItemValue>
        </SeparateItem>
      </ResultArea>
    </Container>
  );
};
