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

export const Event = () => (
    <div>
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
                <VStack spacing={8}>
                    <Heading as="h1" size="2xl">time2gather</Heading>
                    <Text fontSize="1.3rem">
                        Find the <Text as="b" color="green.600">perfect time</Text> for meetings in <Text as="b" color="green.600">no time</Text>.
                    </Text>
                    <Button as={RouterLink} to="/new" color="green.600" fontSize="2xl">
                        Find A Meeting Time
                    </Button>
                </VStack>
            </Grid>
        </Box>
    </div>
)
