import React, { useState, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  Pressable,
} from 'react-native';
import {
  Container,
  InputStyle,
  TextPrice,
  ContainerPrice,
  List,
  DropDown,
  CurrencyImg,
  ModalText,
  ModalButton,
  Modal,
  ModalItem,
  ModalList,
  ModalButtonImg,
  ModalButtonText,
  ContainerBanks,
} from './styles';
import Сurrency from './Сurrency';
import Skeleton from '../Skeleton';
import { FontAwesome } from '@expo/vector-icons';

export default function InputValue({
  inputState,
  setInputState,
  selectedCurr,
  setSelectedCurr,
  combineState,
  openCurrency,
  setOpenCurrency,
}) {
  function onChanged(text) {
    setInputState(text.replace(/[^0-9]/g, ''));
  }
  const [currency, setСurrency] = useState([
    {
      id: 1,
      img: <FontAwesome name='ruble' size={14} color='#333653' />,
      value: 'RUB',
      active: false,
    },
    {
      id: 2,
      img: <FontAwesome name='euro' size={14} color='#333653' />,
      value: 'EURO',
      active: false,
    },
  ]);

  useEffect(() => {
    setSelectedCurr(currency[0]);
  }, [currency]);

  return (
    <Container>
      <ContainerPrice>
        <InputStyle
          keyboardType='numeric'
          returnKeyType='done'
          placeholderTextColor={'white'}
          enablesReturnKeyAutomatically={false}
          placeholder='Введите сумму'
          onChangeText={onChanged}
          value={inputState}
        />

        <Pressable onPress={() => setOpenCurrency(prev => !prev)}>
          <ModalButton>
            {selectedCurr ? (
              <>
                <ModalButtonImg>{selectedCurr.img}</ModalButtonImg>
                <ModalButtonText>{selectedCurr.value}</ModalButtonText>
              </>
            ) : (
              <></>
            )}
          </ModalButton>
        </Pressable>
        {openCurrency ? (
          <Modal>
            <ModalList
              data={currency}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setСurrency(
                      currency.map(currItem => {
                        if (item.id === currItem.id)
                          return { ...currItem, active: true };
                        return { ...currItem, active: false };
                      })
                    );
                    setSelectedCurr(item);
                    setOpenCurrency(false);
                  }}
                >
                  <ModalItem
                    style={
                      item === currency.at(-1)
                        ? { borderBottomWidth: 0, paddingBottom: 0 }
                        : null
                    }
                  >
                    {item.img}
                    <ModalText active={item.active ? true : false}>
                      {item.value}
                    </ModalText>
                  </ModalItem>
                </Pressable>
              )}
            />
          </Modal>
        ) : (
          <></>
        )}
      </ContainerPrice>

      {combineState.length == 0 ? (
        <List
          data={[...new Array(2)]}
          keyExtractor={(item, index) => index}
          scrollEnabled={true}
          renderItem={(_, index) => <Skeleton height={20} index={_.index} />}
        />
      ) : (
        <List
          data={combineState}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <TextPrice>
              {item.platform} : {parseFloat(item.totalCurr).toFixed(2)} USDT
            </TextPrice>
          )}
        />
      )}

      {/* <Сurrency selectedCurr={selectedCurr} setSelectedCurr={setSelectedCurr} /> */}
    </Container>
  );
}
