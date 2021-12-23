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
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import axios from "axios"

export const Event = () => {
    const [state, setState] = React.useState(() => {
        /*
        axios({
            method: 'get',
            url: 'http://localhost:4000/'
        })
        */
        return {
            event: {
                title: 'Test Event',
                participants: ['Bob', 'Emily'],
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
    })
    return (
        <Box my="5vh">
            <Heading textAlign="center" as="h1" size="xl" mb="5vh">{state.event.title}</Heading>
        </Box>
    )
}
