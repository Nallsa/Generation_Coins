import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import {
  ContainerLabel,
  List,
  Container,
  ContainerCurrency,
  ItemCurrency,
  ItemText,
  ActiveCurrency,
} from './styles';

export default function Сurrency({ selectedCurr, setSelectedCurr }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 1, value: '₽', active: true },
    { id: 2, value: '€', active: false },
  ]);

  return (
    <Container>
      <ContainerCurrency>
        <List
          data={items}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ActiveCurrency
              activeOpacity={10}
              onPress={() => {
                setItems(
                  items.map(currItem => {
                    if (item.id === currItem.id)
                      return { ...currItem, active: true };
                    return { ...currItem, active: false };
                  })
                );
              }}
            >
              <ItemCurrency active={!!item.active}>
                <ItemText active={!!item.active}>{item.value}</ItemText>
              </ItemCurrency>
            </ActiveCurrency>
          )}
        />
      </ContainerCurrency>
    </Container>
  );
}
