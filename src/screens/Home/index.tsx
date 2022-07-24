import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack
} from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import Logo from '../../assets/logo_secondary.svg';
import { Button } from '../../components/Button';
import { Filter } from '../../components/Filter';
import { Order } from '../../components/Order';
import { OrderProps } from '../../components/Order/type';
import { StatusCond, StatusSelected } from './type';
import { Alert } from 'react-native';
import { dateFormat } from '../../utils/firestoreDateFormat';
import { Loading } from '../../components/Loading';

export function Home() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatusSelected] = useState<StatusSelected>(StatusCond.OPEN);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log('Erro signOut: ', error);
        return Alert.alert('Sair', 'Não foi possível efetuar o logout.');
      });
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, description, status, created_at } = doc.data();
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          }
        });
        setOrders(data);
        setIsLoading(false)
      });
      return subscriber;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg={'gray.700'}>
      <HStack
        w="full"
        justifyContent={'space-between'}
        alignItems="center"
        bg={'gray.600'}
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems={'center'}
        >
          <Heading color={'gray.100'}>Meus Chamados</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type={StatusCond.OPEN}
            title="em andamento"
            onPress={() => setStatusSelected(StatusCond.OPEN)}
            isActive={statusSelected === StatusCond.OPEN}
          />
          <Filter
            type={StatusCond.CLOSE}
            title="finalizados"
            onPress={() => setStatusSelected(StatusCond.CLOSE)}
            isActive={statusSelected === StatusCond.CLOSE}
          />
        </HStack>
        {isLoading ? <Loading /> :
        <FlatList
          keyExtractor={item => item.id}
          data={orders}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você não possui {'\n'} solicitações{' '}
                {statusSelected === StatusCond.OPEN ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />
          }
        <Button title="Nova Solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
