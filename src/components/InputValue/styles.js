import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import RUB from '../../../assets/rub-svgrepo-com.svg';

export const Container = styled.SafeAreaView`
  margin: 0px 30px 50px 0px;

  z-index: 3;
`;

export const ContainerPrice = styled.SafeAreaView`
  flex-direction: row;
  max-width: 100px;
  min-height: 50px;
  position: relative;
  z-index: 10;
`;

export const ContainerBanks = styled.SafeAreaView`
  flex-direction: row;
  max-width: 120px;
  position: relative;
`;

export const InputStyle = styled.TextInput`
  font-family: Manrope;
  background: #1c1f3e;
  border: 2px solid #333653;
  border-radius: 8px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  min-width: 100px;
  font-weight: 400;
  font-size: 12px;
  color: white;
  padding: 5px;
  height: 40px;
  margin-bottom: 15px;
`;

export const CurrencyImg = styled(RUB)``;

// margin-left: 20px;

export const ModalButton = styled.View`
  min-width: 80px;
  height: 40px;
  position: absolute;
  right: -80px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 2px #333653;
  border-left-width: 0px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonImg = styled.View``;
export const ModalButtonText = styled.Text`
  font-family: Manrope;
  font-size: 13px;
  padding: 6px 0 8px 10px;
`;

export const Modal = styled.View`
  width: 100px;
  padding-bottom: 10px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  right: -95px;
  border-radius: 4px;
  align-items: center;
  shadow-offset: 0px 1px;
  shadow-color: #000;
  shadow-opacity: 0.17;
  shadow-radius: 4.65px;
  elevation: 6;
  z-index: 10;
`;

export const ModalList = styled.FlatList``;

export const ModalItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90px;
  border-bottom-color: #333653;
  border-bottom-width: 1px;
  padding: 8px;
  z-index: 3;
`;

export const ModalText = styled.Text`
  color: ${({ active }) => (active ? `rgb(201, 148, 0);` : `#333653`)};

  font-family: Manrope;
  font-size: 13px;

  padding-left: 12px;
  padding-bottom: 1px;
`;

export const List = styled.FlatList`
  width: 167px;
  min-height: 70px;
  z-index: 3;
`;

export const TextPrice = styled.Text`
  font-family: Manrope;
  font-size: 14px;

  margin-left: 10px;
`;

// margin-left: 20px;
