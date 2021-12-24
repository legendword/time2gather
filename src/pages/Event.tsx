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
  Center,
} from "@chakra-ui/react"
import { Link as RouterLink, useParams } from "react-router-dom"
import axios from "axios"
import { baseURL } from "../util/config"
import { GroupAvailability } from "../components/GroupAvailability"
import { MyAvailability } from "../components/MyAvailability"
import { GroupInformation } from "../components/GroupInformation"
import { NameModal } from "../components/NameModal"
import { ErrorDialog } from "../components/ErrorDialog"

export interface EventObject {
    title: string,
    dates: Array<string>,
    data: Array<{ name: string, available: Array<string>}>,
    allowEdits: boolean
}

export interface GroupInformationObject {
    show: boolean,
    time: string | null,
    // available: Array<string>,
    // unavailable: Array<string>
}

export const Event = () => {
    const params = useParams();

    const [showErrorDialog, setShowErrorDialog] = React.useState(false);
    const [errorCode, setErrorCode] = React.useState<string | null>(null);

    const [loading, setLoading] = React.useState(true);
    const [groupInformation, setGroupInformation] = React.useState<GroupInformationObject>({
        show: false,
        time: null
    });
    
    let storedName = localStorage.getItem(`time2gather-storedName-${params.id}`);
    const [name, setName] = React.useState(storedName);

    const [state, setState] = React.useState<{ success: Boolean, event: EventObject }>({
        success: true,
        event: {
            title: '',
            dates: [],
            data: [],
            allowEdits: false
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
                if (name) {
                    let attendee = r.event.data.find((v: any) => v.name == name);
                    if (attendee) {
                        setAvailable(attendee.available)
                    }
                }
            }
            else {
                if (r.errorCode == 'NOT_FOUND') {
                    setState({
                        success: false,
                        event: {
                            title: '',
                            dates: [],
                            data: [],
                            allowEdits: false
                        }
                    })
                }
                else {
                    setErrorCode(r.errorCode)
                    setShowErrorDialog(true)
                }
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
    const submitAvailabilityEdit = (newAvailable: Array<string>) => {
        axios({
            method: 'post',
            url: `${baseURL}/${params.id}`,
            data: {
                name: name,
                available: newAvailable
            }
        }).then(res => {
            let r = res.data;
            console.log(r);
            if (r.success) {
                setState({
                    success: true,
                    event: r.event
                });
            }
            else {
                setErrorCode(r.errorCode)
                setShowErrorDialog(true)
            }
        })
    }

    const submitName = (name: string, save: boolean) => {
        console.log(name, save)
        if (save) {
            localStorage.setItem(`time2gather-storedName-${params.id}`, name)
        }
        let attendee = state.event.data.find(v => v.name == name);
        if (attendee) {
            setAvailable(attendee.available)
        }
        setName(name)
    }
    
    return (
        <Box my="5vh">
            {
                loading ? (
                    <Flex h="40vh" flexDirection="column" justifyContent="center" alignItems="center">
                        <Spinner color="teal.600" size="xl" thickness="3px" />
                    </Flex>
                ) : (<></>)
            }
            {
                (!loading && state.success) ? (
                    <Box>
                        <Heading textAlign="center" as="h1" size="xl" mb="5vh">{state.event.title}</Heading>
                        <Flex>
                            <Box w="50vw">
                                <Heading textAlign="center" size="md" mb="5">Group Availability</Heading>
                                <GroupAvailability event={state.event} onClick={(time) => setGroupInformation({ show: !(groupInformation.time != null && groupInformation.time == time), time: time })} />
                            </Box>
                            {
                                (name == null || groupInformation.show) ? (
                                    <Box w="50vw">
                                        <Heading textAlign="center" size="md" mb="5">Group Information</Heading>
                                        <GroupInformation info={groupInformation} event={state.event} />
                                        <Center mt={5}>
                                            {
                                                name == null ? (
                                                    <NameModal submitName={submitName} />
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </Center>
                                    </Box>
                                ) : (
                                    <Box w="50vw">
                                        <Heading textAlign="center" size="md" mb="5">Your Availability</Heading>
                                        <MyAvailability allowEdits={state.event.allowEdits} dates={state.event.dates} available={available} onSubmitEdit={(val) => submitAvailabilityEdit(val)} />
                                    </Box>
                                )
                            }
                        </Flex>
                    </Box>
                ) : (<></>)
            }
            {
                (!loading && !state.success) ? (
                    <Text textAlign="center">Event not found...</Text>
                ) : (<></>)
            }
            <ErrorDialog errorCode={errorCode} isOpen={showErrorDialog} setIsOpen={setShowErrorDialog} />
        </Box>
    )
}
