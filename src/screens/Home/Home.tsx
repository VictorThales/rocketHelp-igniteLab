import {
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
  FlatList,
  Center
} from 'native-base';
import { ChatTeardrop, ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useState } from 'react';
import Logo from '../../assets/logo_secondary.svg';
import { Button } from '../../components/Button';
import { Filter } from '../../components/Filter/Filter';
import { Order } from '../../components/Order/Order';
import { OrderProps } from '../../components/Order/type';
import { StatusCond, StatusSelected } from './type';

export function Home() {
  const [statusSelected, setStatusSelected] = useState<StatusSelected>(StatusCond.OPEN);
  const [orders, setOrders] = useState<OrderProps[]>([
    // {
    //   id: '123',
    //   patrimony: '123456',
    //   when: '18/07/2020 às 10:00',
    //   status: 'open'
    // }
  ]);
  const { colors } = useTheme();
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
          <Text color="gray.200">3</Text>
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
          data={orders}
          renderItem={({ item }) => <Order data={item} />}
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
        <Button title="Nova Solicitação" />
      </VStack>
    </VStack>
  );
}
