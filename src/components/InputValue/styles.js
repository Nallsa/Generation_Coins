import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown';
import Rub from '../../../assets/rub-svgrepo-com.svg';

export const Container = styled.SafeAreaView`
  margin: 0px 20px 50px 20px;
`;

export const ContainerPrice = styled.SafeAreaView`
  flex-direction: row;
  max-width: 180px;
  z-index: 2;
`;

export const InputStyle = styled.TextInput`
  font-family: Manrope;
  background: #1c1f3e;
  border: 2px solid #333653;

  border-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  min-width: 130px;
  font-weight: 400;
  font-size: 15px;
  color: white;
  padding: 10px;
  height: 40px;
  margin-bottom: 15px;
`;

export const TextPrice = styled.Text`
  font-family: Manrope;
  font-size: 16px;

  margin-left: 10px;
`;

export const List = styled.FlatList`
  z-index: 0;
`;

// export const DropDown = styled(DropDownPicker)`
//   justify-content: center;
//   align-items: center;
//   width: 32px;
//   margin-left: 20px;
//   border: 1px solid #333653;
//   border-radius: 6px;
// `;

export const DropDown = styled(SelectDropdown)`
  justify-content: center;
  align-items: center;
  width: 32px;

  margin-left: 20px;
  border: 1px solid #333653;
  border-radius: 6px;
`;

export const CurrencyImg = styled(Rub)``;

export const ModalText = styled.Text`
  font-family: Manrope;
  font-size: 13px;
  padding-left: 12px;
  color: #333653;
`;

// margin-left: 20px;
