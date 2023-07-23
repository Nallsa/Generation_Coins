import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import InputValue from '../components/InputValue';
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

export default function Home() {
  const [combineState, setCombineState] = useState([]);
  const [inputState, setInputState] = useState('');
  const [selectedCurr, setSelectedCurr] = useState('');
  const [loading, setLoading] = useState(true);

  async function binance() {
    const res = await axios.post(
      'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
      {
        transAmount: inputState ? Number(inputState) : 0,
        asset: 'USDT',
        countries: [],
        fiat: 'RUB',
        page: 1,
        payTypes: [],
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
        amount: String(inputState),
        authMaker: false,
        canTrade: false,
        currencyId: 'RUB',
        page: '1',
        payment: [],
        side: '1',
        size: '1',
        tokenId: 'USDT',
        userId: 75111536,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
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
    Promise.all([binance(), bybit(), garantex()])
      .then(([binanceArr, bybitArr, garantexArr]) =>
        setCombineState(
          [...binanceArr, ...bybitArr, ...garantexArr].sort(
            (a, b) => a.price - b.price
          )
        )
      )
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    garantex();
    getAllUsers();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size='large' color='#333653' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      <WrapperContent>
        <WrapperImg>
          <ImageLogo />
        </WrapperImg>

        <InputValue
          selectedCurr={selectedCurr}
          setSelectedCurr={setSelectedCurr}
          inputState={inputState}
          setInputState={setInputState}
          combineState={combineState}
          getAllUsers={getAllUsers}
        />
        <Table combineState={combineState} />

        <Button onPress={() => getAllUsers()}>
          <ButtonText>Refresh</ButtonText>
        </Button>
      </WrapperContent>
      {/* </ScrollView> */}
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
