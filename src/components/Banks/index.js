import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

export default function Banks({ bankValue, setBankValue }) {
  const [tradeMethods, setTradeMethods] = useState([
    {
      id: 1,
      label: 'Все способы оплаты',
    },
  ]);
  const [isFocus, setIsFocus] = useState(false);

  async function fetchBanks() {
    const resBinance = await axios.post(
      'https://p2p.binance.com/bapi/c2c/v2/public/c2c/adv/filter-conditions',
      { fiat: 'RUB' }
    );

    const resBybit = await axios.get(
      'https://api2.bybit.com/spot/api/otc/config'
    );

    function composite(a, b) {
      for (let i = 0; i < a.length; i++) {
        const elementI = a[i];
        for (let j = 0; j < b.length; j++) {
          const elementJ = b[j];

          if (elementI.tradeMethodName === elementJ.paymentName) {
            const res = {
              id: i + 1,
              label: elementJ.paymentName,
              binance: elementI.identifier,
              bybit: elementJ.paymentType,
            };
            setTradeMethods(prev => [...prev, res]);
          }
        }
      }
    }

    composite(resBinance.data.data.tradeMethods, resBybit.data.result.payments);

    // console.log(tradeMethods);
    // tradeMethods.map(item => {
    //   if (item.label === 'Rosbank') console.log(item);
    // });
  }

  useEffect(() => {
    fetchBanks();
  }, []);

  const renderItem = item => {
    return (
      <View
        style={[
          styles.item,
          item === tradeMethods.at(-1) && { borderBottomWidth: 0 },
        ]}
      >
        <Text
          style={[
            styles.textItem &&
              item.label === bankValue.label && { color: 'rgb(201, 148, 0);' },
          ]}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#333653' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconColor='#333653'
        placeholder={bankValue.label || 'Все способы оплаты'}
        data={tradeMethods}
        search
        maxHeight={300}
        labelField='label'
        bankValueField='bankValue'
        searchPlaceholder='Search...'
        onChange={item => {
          setBankValue(item);
        }}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 170,
  },
  dropdown: {
    height: 40,
    borderColor: '#333653',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    fontFamily: 'Manrope',
    left: 10,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 3,
    fontSize: 13,
  },
  placeholderStyle: {
    fontFamily: 'Manrope',
    fontSize: 12,
    paddingBottom: 4,
    color: 'red',
  },
  item: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  textItem: {
    fontFamily: 'Manrope',
    flex: 1,
    fontSize: 13,
  },
  selectedTextStyle: {
    fontFamily: 'Manrope',
    fontSize: 13,
  },
  inputSearchStyle: {
    fontFamily: 'Manrope',
    height: 40,
    fontSize: 13,
  },
});
