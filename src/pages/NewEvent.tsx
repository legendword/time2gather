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
} from "@chakra-ui/react"
import axios from "axios"
import { DatePicker } from "../components/DatePicker"
import { useNavigate } from "react-router-dom"
import { baseURL } from "../util/config"

export class NewEvent extends React.Component<any, { title: string, dates: Array<string> }> {
    constructor(props: any) {
        super(props)

        this.state = {
            title: '',
            dates: []
        }
    }

    render() {
        return (
            <Box>
                <Box textAlign="center" fontSize="xl" minH="100vh" p={3} py="5vh">
                    <Heading as="h1" size="xl" mb="5vh">New Meeting</Heading>
                    <VStack spacing={14} maxW="container.md" align="center" mx="auto">
                        <FormControl>
                            <FormLabel htmlFor="title">Meeting Title</FormLabel>
                            <Input id="title" type="text" value={this.state.title} onChange={(ev) => this.setState({title: ev.target.value})} />
                        </FormControl>
                        <Box>
                            <Text align="center" fontSize="md" fontWeight="500" mb="3" display="none">What Days Might Work?</Text>
                            <DatePicker selected={this.state.dates} onUpdate={(val) => this.setState({dates: val})} />
                        </Box>
                        <Button onClick={() => this.submitNewEvent()} size="lg" colorScheme="teal">
                            Create Meeting
                        </Button>
                    </VStack>
                </Box>
            </Box>
        )
    }

    submitNewEvent() {
        // console.log(this.state.title, this.state.dates)
        
        axios({
            method: 'post',
            url: `${baseURL}/`,
            data: {
                title: this.state.title,
                dates: this.state.dates.sort()
            }
        }).then(res => {
            let r = res.data
            console.log(r)
            if (r.success) {
                let navigate = useNavigate()
                navigate(`/${r.eventId}`)
            }
            else {
                // #todo: error handling
            }
        })
    }
}
