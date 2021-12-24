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
  FormControl,
  FormLabel,
  Input,
  HStack,
  Switch,
  Tooltip,
} from "@chakra-ui/react"
import axios from "axios"
import { DatePicker } from "../components/DatePicker"
import { useNavigate } from "react-router-dom"
import { baseURL } from "../util/config"
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { ErrorDialog } from "../components/ErrorDialog"

export const NewEvent = () => {
    const [title, setTitle] = React.useState('')
    const [dates, setDates] = React.useState<Array<string>>([])
    const [allowEdits, setAllowEdits] = React.useState(false)

    const [errorInfo, setErrorInfo] = React.useState<{ show: boolean, errorCode: string | null }>({
        show: false,
        errorCode: null
    })

    const navigate = useNavigate()

    const submitNewEvent = () => {
        let sortedDates = [...dates].sort()
        axios({
            method: 'post',
            url: `${baseURL}/`,
            data: {
                title: title,
                dates: sortedDates,
                allowEdits: allowEdits
            }
        }).then(res => {
            let r = res.data
            console.log(r)
            if (r.success) {
                navigate(`/${r.eventId}`)
            }
            else {
                setErrorInfo({
                    show: true,
                    errorCode: r.errorCode
                })
            }
        })
    }

    return (
        <Box>
            <Box textAlign="center" fontSize="xl" minH="100vh" p={3} py="5vh">
                <Heading as="h1" size="xl" mb="5vh">New Meeting</Heading>
                <VStack spacing={14} maxW="container.md" align="center" mx="auto">
                    <FormControl>
                        <Input id="title" type="text" value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder="Meeting Title" />
                    </FormControl>
                    <Box>
                        <Text align="center" fontSize="md" fontWeight="500" mb="3" display="none">What Days Might Work?</Text>
                        <DatePicker selected={dates} onUpdate={(val) => setDates(val)} />
                    </Box>
                    <FormControl display='flex' alignItems='center' justifyContent='center'>
                        <FormLabel htmlFor="allowEdits" mb="0">
                            Allow Edits
                            <Tooltip label="Allow attendees to edit their availabilities." openDelay={500}>
                                <QuestionOutlineIcon ml="2" mt="-1" cursor="help" />
                            </Tooltip>
                        </FormLabel>
                        <Switch id="allowEdits" colorScheme="teal" size="md" isChecked={allowEdits} onChange={ev => setAllowEdits(ev.target.checked)} />
                    </FormControl>
                    <Button onClick={() => submitNewEvent()} size="lg" colorScheme="teal">
                        Create Meeting
                    </Button>
                </VStack>
            </Box>
            <ErrorDialog errorCode={errorInfo.errorCode} isOpen={errorInfo.show} setIsOpen={(val) => setErrorInfo({ show: val, errorCode: errorInfo.errorCode})} />
        </Box>
    )
}