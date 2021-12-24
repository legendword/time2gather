import { Badge, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { EventObject, GroupInformationObject } from "../pages/Event";

export const GroupInformation = (props: { info: GroupInformationObject, event: EventObject }) => {
    if (props.info.time == null) {
        return (
            <VStack spacing={5}>
                <Text size="md">Attendees</Text>
                <Flex justify="center" align="center" gap={3}>
                    {
                        props.event.data.map(v => (
                            <Badge colorScheme="teal" key={v.name}>{v.name}</Badge>
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
            <VStack spacing={5}>
                <Text size="md">{props.info.time}</Text>
                <HStack spacing={3}>
                    <Text>Available: </Text>
                    {
                        props.event.data.filter(v => v.available.includes(props.info.time!)).map(v => (
                            <Badge colorScheme="teal" key={v.name}>{v.name}</Badge>
                        ))
                    }
                </HStack>
                <HStack spacing={3}>
                    <Text>Unavailable: </Text>
                    {
                        props.event.data.filter(v => !v.available.includes(props.info.time!)).map(v => (
                            <Badge colorScheme="teal" key={v.name}>{v.name}</Badge>
                        ))
                    }
                </HStack>
            </VStack>
        )
    }
}