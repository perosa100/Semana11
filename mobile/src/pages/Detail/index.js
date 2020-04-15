import React from 'react';
import styles from './styles';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import Mailer from 'react-native-mail';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá ${
    incident.name
  } estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${
    incident.value === 0
      ? 'GRATIS'
      : Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(incident.value)
  }`;
  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    Mailer.mail(
      {
        subject: `Heróis do caso: ${incident.title}`,
        recipients: [incident.email],
        //  ccRecipients: ['patrickperosapp@gmail.com'],
        //  bccRecipients: ['patrickperosapp@gmail.com'],
        body: message,
        isHTML: true,
        attachment: {
          path: '', // The absolute path of the file from which to read data.
          type: '', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: '', // Optional: Custom filename for attachment
        },
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          { cancelable: true }
        );
      }
    );
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Icon name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.city} do {incident.uf}
        </Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>Valor:</Text>
        <Text style={styles.incidentValue}>
          {incident.value === 0
            ? 'GRATIS'
            : Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o Dia</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso!</Text>

        <Text style={styles.herodescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
