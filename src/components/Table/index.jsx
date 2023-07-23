import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

export default function Table({ combineState }) {
  return (
    <View style={styles.wrapper}>
      {/* Table Container */}
      <View style={styles.table}>
        {/* Table Head */}
        <View style={styles.table_head}>
          <View style={{ width: '15%' }}>
            <Text style={styles.table_head_captions}>№</Text>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={styles.table_head_captions}>Platform</Text>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={styles.table_head_captions}>Сourse</Text>
          </View>
        </View>

        {combineState.length > 0 ? (
          <FlatList
            data={combineState}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View key={item.id} style={styles.table_body_single_row}>
                <View style={{ width: '15%' }}>
                  <Text style={styles.table_data}>{index + 1}</Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text style={styles.table_data}>{item.platform}</Text>
                </View>
                <View style={{ width: '45%' }}>
                  <Text style={styles.table_data}>{item.price}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 390,
    minHeight: 70,
    // flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  table_head: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 7,
    backgroundColor: '#1c1f3e',
    width: '100%',
  },
  table_head_captions: {
    fontFamily: 'Manrope',
    fontSize: 17,
    color: 'white',
  },

  table_body_single_row: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    padding: 7,
  },
  table_data: {
    fontFamily: 'Manrope',
    fontSize: 15,
  },
  table: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    backgroundColor: '#fff',
  },
});
