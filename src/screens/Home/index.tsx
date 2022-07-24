import { useNavigation } from '@react-navigation/native';
import {
  Center, FlatList, Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack
} from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useState } from 'react';
import Logo from '../../assets/logo_secondary.svg';
import { Button } from '../../components/Button';
import { Filter } from '../../components/Filter';
import { Order } from '../../components/Order';
import { OrderProps } from '../../components/Order/type';
import { StatusCond, StatusSelected } from './type';

export function Home() {
  const navigation = useNavigation();
  const [statusSelected, setStatusSelected] = useState<StatusSelected>(StatusCond.OPEN);
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '1',
      patrimony: '00001',
      when: '18/07/2020 às 10:00',
      status: 'close'
    },
    {
      id: '2',
      patrimony: '00002',
      when: '18/07/2020 às 11:00',
      status: 'open'
    },
    {
      id: '3',
      patrimony: '00003',
      when: '18/07/2020 às 12:00',
      status: 'open'
    },
    {
      id: '4',
      patrimony: '00004',
      when: '18/07/2020 às 13:00',
      status: 'open'
    },
    {
      id: '5',
      patrimony: '00005',
      when: '18/07/2020 às 10:00',
      status: 'close'
    },
    {
      id: '6',
      patrimony: '00006',
      when: '18/07/2020 às 11:00',
      status: 'open'
    },
    {
      id: '7',
      patrimony: '00007',
      when: '18/07/2020 às 12:00',
      status: 'open'
    },
    {
      id: '8',
      patrimony: '00008',
      when: '18/07/2020 às 13:00',
      status: 'close'
    }
  ]);
  const { colors } = useTheme();

  function handleNewOrder(){
     navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string){
    navigation.navigate('details',{orderId})
  }

  const filterItems = (status: StatusCond) => {
    return orders.filter(item => item.status === status)
  }

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
        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
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
        <FlatList
          keyExtractor={item => item.id}
          data={filterItems(statusSelected)}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você não possui {'\n'} solicitações {statusSelected === StatusCond.OPEN ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />
        <Button title="Nova Solicitação" onPress={handleNewOrder}/>
      </VStack>
    </VStack>
  );
}
