import { useRoute } from '@react-navigation/native';
import { VStack, Text, Center, HStack, useTheme, ScrollView } from 'native-base';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { OrderDetails, RouteParams } from './type';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../../DTOs/orderDTO';
import { dateFormat } from '../../utils/firestoreDateFormat';
import { Loading } from '../../components/Loading';
import { StatusCond } from '../Home/type';
import {
  CircleWavyCheck,
  DesktopTower,
  Hourglass,
  Clipboard
} from 'phosphor-react-native';
import { CardDetails } from '../../components/CardDetails/CardDetails';
import { Input } from '../../components/Input';

export function Details() {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSoluiton] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  const { orderId } = route.params as RouteParams;
  const { colors } = useTheme();
  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const { created_at, description, patrimony, status, closed_at, solution } =
          doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          closed,
          solution,
          when: dateFormat(created_at)
        });

        setIsLoading(false);
      });
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <VStack flex={1} bg={'gray.700'}>
      <Header title="Solicitação" />
      <HStack bg="gray.500" justifyContent={'center'} p={4}>
        {order.status === StatusCond.CLOSE ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          fontSize={'sm'}
          color={
            order.status === StatusCond.CLOSE ? colors.green[300] : colors.secondary[700]
          }
          ml={2}
          textTransform={'uppercase'}
        >
          {order.status === StatusCond.CLOSE ? 'finalizado' : 'Em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          footer={order.when}
        />
        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={Clipboard}
        />
        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          <Input />
        </CardDetails>
      </ScrollView>
    </VStack>
  );
}
