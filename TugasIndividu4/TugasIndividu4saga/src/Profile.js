import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { fetchIpData } from "./api";
import { useNavigation } from "@react-navigation/native";
import store from "./redux-saga/store";

const Profile = () => {
  const ipData = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Mengakses objek navigation

  useEffect(() => {
    dispatch(fetchIP());
  }, [dispatch]);

  const handleBack = () => {
    navigation.goBack(); // Navigasi kembali ke halaman sebelumnya
  };

  const handleLinkPress = () => {
    const url = "http://ip-api.com/json/";
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.username}>Error: {error}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="defaults" />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={30} color="#FFFFFF" />
        </TouchableOpacity>
        <Icon name="account" size={100} color="#FFFFFF" />
        <Text style={styles.username}>Pandu Wiratama</Text>
        <Text style={styles.usernim}>Tugas Individu 4</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nama</Text>
          <Text style={styles.infoValue}>Pandu Wiratama</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>NIM</Text>
          <Text style={styles.infoValue}>120140170</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Kelas</Text>
          <Text style={styles.infoValue}>PAM | RA</Text>
        </View>
        <View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>IP Anda</Text>
            <Text style={styles.infoValue}>{ipData?.query} </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Kota Anda</Text>
            <Text style={styles.infoValue}>{ipData?.city}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Negara Anda</Text>
            <Text style={styles.infoValue}>{ipData?.country}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Zona</Text>
            <Text style={styles.infoValue}>{ipData?.timezone}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>ISP Anda</Text>
            <Text style={styles.infoValue}>{ipData?.isp}</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoDesc}>
            Halaman ini memakai Redux Thunk dan Fetch API dari{" "}
            <Text style={styles.linkText} onPress={handleLinkPress}>
              http://ip-api.com/json/
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 30,
    zIndex: 1,
  },
  header: {
    backgroundColor: "#32E0C4",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: "100%",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  usernim: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 5,
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  infoValue: {
    fontSize: 16,
    color: "#777777",
  },
  infoDesc: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    width: "100%",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Profile;