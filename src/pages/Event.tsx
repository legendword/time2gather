import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  Button,
  Flex,
  Spinner,
} from "@chakra-ui/react"
import { Link as RouterLink, useParams } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../util/config"
import { GroupAvailability } from "../components/GroupAvailability"
import { MyAvailability } from "../components/MyAvailability"

export interface EventObject {
    title: string,
    dates: Array<string>,
    data: Array<{ name: string, available: Array<string>}>
}

export const Event = () => {
    const params = useParams();

    const [loading, setLoading] = React.useState(true);

    const [state, setState] = React.useState<{ success: Boolean, event: EventObject, errorInfo?: Object }>({
        success: true,
        event: {
            title: '',
            dates: [],
            data: []
        }
    });

    const [available, setAvailable] = React.useState<Array<string>>([]);

    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${baseURL}/${params.id}`
        }).then(res => {
            let r = res.data;
            if (r.success) {
                setState({
                    success: true,
                    event: r.event
                })
            }
            else {
                setState({
                    success: false,
                    errorInfo: r,
                    event: {
                        title: '',
                        dates: [],
                        data: []
                    }
                })
            }
            setLoading(false);
        })
    }, [])

        /*
        return {
            event: {
                title: 'Test Event',
                dates: ['2021-12-24', '2021-12-25'],
                data: [
                    {
                        name: 'Bob',
                        available: [
                            '2021-12-24 16:30',
                            '2021-12-24 17:00'
                        ]
                    },
                    {
                        name: 'Emily',
                        available: []
                    }
                ]
            }
        }
        */
    const mouseOverMine = (ev: any, time: string) => {
        console.log(ev.buttons)
        if ([1, 3, 5].includes(ev.buttons)) {
            if (available.includes(time)) {
                setAvailable(available.filter(v => v != time))
            }
            else {
                setAvailable([...available, time])
            }
            ev.preventDefault()
        }
    }
    
    return (
        <Box my="5vh">
            {
                loading ? (
                    <Flex h="80vh" flexDirection="column" justifyContent="center" alignItems="center">
                        <Spinner color="teal.600" size="xl" thickness="3px" />
                    </Flex>
                ) : (<Box></Box>)
            }
            {
                (!loading && state.success) ? (
                    <Box>
                        <Heading textAlign="center" as="h1" size="xl" mb="5vh">{state.event.title}</Heading>
                        <Flex>
                            <Box w="50vw">
                                <Heading textAlign="center" size="md" mb="3">Group Availability</Heading>
                                <GroupAvailability event={state.event} />
                            </Box>
                            <Box w="50vw">
                                <Heading textAlign="center" size="md" mb="3">Your Availability</Heading>
                                <MyAvailability dates={state.event.dates} available={available} mouseOver={(ev, time) => mouseOverMine(ev, time)} />
                            </Box>
                        </Flex>
                    </Box>
                ) : (
                    <Text textAlign="center">Event not found...</Text>
                )
            }
        </Box>
    )
}
