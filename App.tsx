import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";

// Consatnts
const baseUrl = "https://zipcloud.ibsnet.co.jp/api/search";
const queryZipcode = "?zipcode=";
const queryCallback = "?callback=";
const queryLimit = "?limit=";

export default function App() {
  // States
  const [inputZipcode, setInputZipcode] = React.useState("");
  const [response, setResponse] = React.useState<ZipcloudResponseResult[]>([]);

  const getZipcloud = () => {
    fetch(baseUrl + queryZipcode + inputZipcode, {
      method: "GET"
    })
      .then(response => response.json())
      .then(text => setResponse(text.results))
      .catch(error => console.error(error));
  };

  const renderZipResult = ({ item }: { item: ZipcloudResponseResult }) => {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>
            {item.kana1} {item.kana2} {item.kana3}
          </Text>
          <Text>
            {item.address1} {item.address2} {item.address3}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <TextInput
          style={styles.inputText}
          onChangeText={text => setInputZipcode(text)}
          value={inputZipcode}
          keyboardType="numeric"
          maxLength={7}
        ></TextInput>
        <Button title="Search" onPress={getZipcloud}></Button>
      </View>
      <FlatList
        data={response}
        renderItem={renderZipResult}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputs: {
    flexDirection: "row",
    marginTop: 100,
    marginBottom: 20
  },
  inputText: {
    width: 100,
    backgroundColor: "lightgray",
    color: "#000"
  },
  item: {
    minWidth: "100%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10
  }
});
