import styled from 'styled-components/native';
// import DropDownPicker from 'react-native-dropdown-picker';

export const Container = styled.View`
  position: absolute;
  right: 20%;
  margin-left: 30px;
  z-index: 1;
`;

export const ContainerLabel = styled.Text`
  position: absolute;
  bottom: 50;
  left: 20;
  font-size: 16px;
`;

export const ActiveCurrency = styled.Pressable``;

export const ContainerCurrency = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

export const ItemCurrency = styled.View`
  background: ${({ active }) => (active ? `#333653` : `transparent`)};
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: 32px;
  height: 30px;
  border: 1px solid #333653;
  border-radius: 6px;
`;

export const ItemText = styled.Text`
  color: ${({ active }) => (active ? `#f1f1f1` : `#333653`)};

  font-size: 16px;
`;

export const List = styled.FlatList`
  margin-bottom: 10px;
  margin-left: 10px;

  flex-direction: row;
`;
