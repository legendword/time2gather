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

export class NewEvent extends React.Component {
    render() {
        return (
            <Box>
                <Box textAlign="center" fontSize="xl" minH="100vh" p={3} py="10vh">
                    <Heading as="h1" size="2xl" mb="10vh">New Meeting</Heading>
                    <VStack spacing={14} maxW="container.md" align="center" mx="auto">
                        <FormControl>
                            <FormLabel htmlFor="title">Meeting Title</FormLabel>
                            <Input id="title" type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="date-picker">What Days Might Work?</FormLabel>
                            <DatePicker id="date-picker" />
                        </FormControl>
                        <Button onClick={() => this.submitNewEvent()} size="lg" colorScheme="teal">
                            Create Meeting
                        </Button>
                    </VStack>
                </Box>
            </Box>
        )
    }

    submitNewEvent() {
        axios({
            method: 'post',
            url: '/'
        })
    }
}
