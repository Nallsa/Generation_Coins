import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import InputValue from '../components/InputValue';
import Banks from '../components/Banks';
import styled from 'styled-components/native';
import Logo from '../../assets/Logo.svg';

const WrapperContent = styled.View`
  position: relative;
  justify-content: center;
`;

const WrapperImg = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const ImageLogo = styled(Logo)`
  width: 71.688px;
  height: 73px;
  margin-bottom: 60px;
`;

const Button = styled.TouchableOpacity`
  padding: 12px;
  width: 120px;
  background: #2c2f50;
  border-radius: 16px;
  transition: all 0.2s;
  margin: 30px auto;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-family: Manrope;
  font-size: 14px;
  color: white;
`;

const WrapperInputs = styled.View`
  margin: 0 auto;

  flex-direction: row;
`;

export default function Home() {
  const [combineState, setCombineState] = useState([]);
  const [inputState, setInputState] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCurr, setSelectedCurr] = useState('');
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openBanks, setOpenBanks] = useState(false);
  const [bankValue, setBankValue] = useState({
    id: 0,
    label: 'Все способы оплаты',
  });

  async function binance() {
    const res = await axios.post(
      'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
      {
        transAmount: inputState ? Number(inputState) : 0,
        asset: 'USDT',
        countries: [],
        fiat: 'RUB',
        page: 1,
        payTypes: bankValue.binance ? [bankValue.binance] : [],
        proMerchantAds: false,
        publisherType: null,
        rows: 1,
        shieldMerchantAds: false,
        tradeType: 'BUY',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const binance = res.data.data.map(item => {
      return {
        id: item.advertiser.userNo,
        nickName: item.advertiser.nickName,
        price: item.adv.price,
        platform: 'Binance',
        totalCurr:
          Number(inputState) !== 0 ? Number(inputState) / item.adv.price : 0,
      };
    });

    return binance;
  }

  async function bybit() {
    const res = await axios.post(
      'https://api2.bybit.com/fiat/otc/item/online',
      {
        amount: inputState,
        authMaker: false,
        canTrade: false,
        currencyId: 'RUB',
        page: '1',
        payment: bankValue.bybit ? [bankValue.bybit.toString()] : [],
        side: '1',
        size: '1',
        tokenId: 'USDT',
        userId: 75111536,
      }
    );

    const bybit = res.data.result.items.map(item => {
      return {
        id: item.id,
        nickName: item.nickName,
        price: item.price,
        platform: 'Bybit',
        totalCurr:
          Number(inputState) !== 0 ? Number(inputState) / item.price : 0,
      };
    });

    return bybit;
  }

  async function garantex() {
    const res = await axios.get(
      'https://garantex.io/api/v2/depth?market=usdtrub'
    );

    let totalCurr = 0;

    const garantex = res.data.asks.map(item => {
      if (Number(inputState) !== 0) {
        const preTotal = Number(inputState) / item.price;
        const commission = (preTotal / 100) * 0.25;

        totalCurr = preTotal - commission;
      }
      return {
        id: item.id,
        price: item.price,
        volume: item.volume,
        platform: 'Garantex',
        totalCurr,
      };
    });

    return [garantex.filter(item => item.volume > totalCurr)[0]];
  }

  async function getAllUsers() {
    setLoading(true);
    Promise.all([binance(), bybit(), garantex()]).then(
      async ([binanceArr, b, garantexArr]) => {
        setCombineState(
          [...binanceArr, ...b, ...garantexArr].sort(
            (a, b) => a.price - b.price
          )
        );

        // const bybitRes = await bybit();

        // setCombineState(
        //   [...binanceArr, ...garantexArr, ...bybitRes].sort(
        //     (a, b) => a.price - b.price
        //   )
        // );
      }
    );

    setLoading(false);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  // if (loading) {
  //   return (
  //     <View style={[styles.container, styles.horizontal]}>
  //       <ActivityIndicator size='large' color='#333653' />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Pressable onPress={() => setOpenCurrency(false)}>
          <WrapperContent>
            <WrapperImg>
              <ImageLogo />
            </WrapperImg>
            <WrapperInputs>
              <InputValue
                selectedCurr={selectedCurr}
                setSelectedCurr={setSelectedCurr}
                inputState={inputState}
                setInputState={setInputState}
                combineState={combineState}
                getAllUsers={getAllUsers}
                openCurrency={openCurrency}
                setOpenCurrency={setOpenCurrency}
              />
              <Banks bankValue={bankValue} setBankValue={setBankValue} />
            </WrapperInputs>

            <Table loading={loading} combineState={combineState} />

            <Button
              disabled={loading}
              onPress={() => {
                setCombineState([]);
                getAllUsers();
              }}
            >
              <ButtonText>Refresh</ButtonText>
            </Button>
          </WrapperContent>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
