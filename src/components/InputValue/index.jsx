import React, { useState, useEffect } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  ImageBackground,
  View,
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
} from './styles';
import Сurrency from './Сurrency';
import SelectDropdown from 'react-native-select-dropdown';

export default function InputValue({
  inputState,
  setInputState,
  selectedCurr,
  setSelectedCurr,
  combineState,
}) {
  function onChanged(text) {
    setInputState(text.replace(/[^0-9]/g, ''));
  }

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '₽', value: '₽' },
    { label: '€', value: '€' },
  ]);

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
        {/* <DropDown
          showArrowIcon={false}
          placeholder=''
          style={{}}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          // dropDownContainerStyle={}
          // containerStyle={{ maxHeight: 10 }}
          containerProps={{ style: { maxHeight: 10, maxWidth: 32 } }}
        /> */}
        <View style={styles.buttonStyle}>
          <View style={styles.dropdownStyle}>
            <View style={styles.rowStyle}>
              <CurrencyImg />
              <ModalText>RUB</ModalText>
            </View>
          </View>
        </View>
        {/* <DropDown
          data={items}
          dropdownOverlayColor={'transparent'}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
          dropdownStyle={styles.dropdownStyle}
          rowStyle={styles.rowStyle}
          selectedRowStyle={styles.selectedRowStyle}
          selectedRowTextStyle={styles.selectedRowTextStyle}
          showsVerticalScrollIndicator={false}
          defaultValue={items[0]}
          onSelect={(selectedItem, index) => {
            return selectedItem;
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return <CurrencyImg />;
          }}
          rowTextForSelection={(item, index) => {
            return item.value;
          }}
        /> */}
      </ContainerPrice>
      <Сurrency selectedCurr={selectedCurr} setSelectedCurr={setSelectedCurr} />

      <List
        data={combineState}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TextPrice>
            {item.platform} : {parseFloat(item.totalCurr).toFixed(2)} USDT
          </TextPrice>
        )}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 80,
    height: 40,
    position: 'absolute',
    right: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#333653',
    borderWidth: 2,
  },
  buttonTextStyle: {
    fontFamily: 'Manrope',
    color: '#1c1f3e',
    fontSize: 18,
  },
  dropdownStyle: {
    width: 100,
    // minHeight: 120,
    paddingBottom: 10,
    backgroundColor: '#fff',
    // borderColor: '#333653',
    // borderWidth: 1,
    position: 'absolute',
    top: 45,
    // right: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  rowStyle: {
    flexDirection: 'row',
    width: 90,
    borderBottomColor: '#333653',
    borderBottomWidth: 1,
    // backgroundColor: 'black',
    padding: 10,
    // marginTop: 15,
  },
});
