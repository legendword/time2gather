import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
  Button,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { Link } from "react-router-dom"

export class Landing extends React.Component {
    render() {
        return (
            <div>
                <Box textAlign="center" fontSize="xl">
                    <Grid minH="100vh" p={3}>
                        <ColorModeSwitcher justifySelf="flex-end" />
                        <VStack spacing="5vh">
                            <Heading as="h1" size="2xl">time2gather</Heading>
                            <Text fontSize="1.3rem">
                                Find the <Text as="b" color="teal.600">perfect time</Text> for meetings in <Text as="b" color="teal.600">no time</Text>.
                            </Text>
                            <Button as={Link} to="/" size="lg" colorScheme="teal">
                                Find A Meeting Time
                            </Button>
                        </VStack>
                    </Grid>
                </Box>
            </div>
        )
    }
}
