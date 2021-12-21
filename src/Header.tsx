import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  Button,
  Flex,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Link, Outlet } from "react-router-dom"

export const Header = () => (
    <Box>
        <Flex justifyContent="space-between" alignItems="center" p={4}>
            <Text fontWeight="bold" fontSize="xl" colorScheme="teal">time2gather</Text>
            <Box>
                <Button as={Link} to="/new" colorScheme="teal" variant="outline">Plan New Meeting</Button>
                <ColorModeSwitcher />
            </Box>
        </Flex>
        <Outlet />
    </Box>
)