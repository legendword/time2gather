import { Badge, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { EventObject, GroupInformationObject } from "../pages/Event";

export const GroupInformation = (props: { info: GroupInformationObject, event: EventObject }) => {
    if (props.info.time == null) {
        return (
            <VStack spacing={5} minH="36">
                <Text size="md">Attendees</Text>
                <Flex justify="center" align="center" flexWrap="wrap" gap={3}>
                    {
                        props.event.data.map(v => (
                            <Badge colorScheme="blue" key={v.name}>{v.name}</Badge>
                        ))
                    }
                    {
                        props.event.data.length == 0 ? (
                            <Text>There are no attendees yet.</Text>
                        ) : (
                            <></>
                        )
                    }
                </Flex>
            </VStack>
        )
    }
    else {
        return (
            <VStack spacing={5} minH="36">
                <Text size="md">{props.info.timeRange}</Text>
                <Flex w="100%">
                    <VStack w={['100%', '50%']} spacing={4}>
                        <Text align="center">Available</Text>
                        {
                            props.event.data.filter(v => v.available.includes(props.info.time!)).map(v => (
                                <Center key={v.name}>
                                    <Badge colorScheme="green">{v.name}</Badge>
                                </Center>
                            ))
                        }
                    </VStack>
                    <VStack w={['100%', '50%']} spacing={4}>
                        <Text align="center">Unavailable</Text>
                        {
                            props.event.data.filter(v => !v.available.includes(props.info.time!)).map(v => (
                                <Center key={v.name}>
                                    <Badge colorScheme="red">{v.name}</Badge>
                                </Center>
                            ))
                        }
                    </VStack>
                </Flex>
            </VStack>
        )
    }
}