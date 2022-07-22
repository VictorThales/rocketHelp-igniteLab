import { Box, Circle, HStack, Text, useTheme, VStack, Pressable } from 'native-base';
import { CircleWavyCheck, ClockAfternoon, Hourglass } from 'phosphor-react-native';
import { StatusCond } from '../../screens/Home/type';
import { IOrder } from './type';

export function Order({ data, ...rest }: IOrder) {
  const { colors } = useTheme();
  const statusColor = data.status === StatusCond.OPEN ? colors.secondary[700] : colors.green[300];
  return (
    <Pressable {...rest} >
    <HStack
      bg="gray.600"
      mb={4}
      alignItems="center"
      justifyContent={'space-between'}
      rounded="sm"
      overflow={'hidden'}
    >
      <Box h={'full'} w={2} bg={statusColor} />
      <VStack flex={1} my={5} ml={5}>
        <Text color={'white'} fontSize={'md'}>
          {' '}
          Patrimônio {data.patrimony}
        </Text>
        <HStack alignItems={'center'}>
          <ClockAfternoon size={15} color={colors.gray[300]} />
          <Text color={'gray.200'} fontSize={'xs'} ml={1}>
            {data.when}
          </Text>
        </HStack>
      </VStack>
      <Circle bg={'gray.500'} h={12} w={12} mr={5}>
        {data.status === StatusCond.CLOSE ? <CircleWavyCheck size={24} color={statusColor}/> : <Hourglass size={24} color={statusColor}/> }
      </Circle>
    </HStack>
    </Pressable>
  );
}
