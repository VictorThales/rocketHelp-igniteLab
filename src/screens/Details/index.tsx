import { useRoute } from '@react-navigation/native';
import { VStack, Text, Center } from 'native-base';
import { Header } from '../../components/Header';
import { RouteParams } from './type';

export function Details() {
  const route = useRoute();
  const {orderId} = route.params as RouteParams;
  return (
    <VStack flex={1} bg={'gray.700'}>
      <Header title="Solicitação" />
      <Center> <Text color={'white'}>Ordem: {orderId}</Text></Center>
    </VStack>
  );
}
