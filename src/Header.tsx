import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  Button,
  Flex,
  Link,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Link as RouterLink, Outlet } from "react-router-dom"

export const Header = () => (
    <Box>
        <Flex justifyContent="space-between" alignItems="center" px={[2, 4]} py={3} borderBottom={"1px solid "+useColorModeValue("var(--chakra-colors-gray-300)", "var(--chakra-colors-gray-600)")}>
            <HStack spacing={["12px", "24px"]}>
                <Text as={RouterLink} to="/about" fontWeight="bold" className="primary-link-style" fontSize="lg">time2gather</Text>
                <Button as={RouterLink} to="/" colorScheme="teal" variant="outline" size="sm">Plan New Meeting</Button>
            </HStack>
            
            <Box>
                <ColorModeSwitcher size="sm" fontSize="md" />
            </Box>
        </Flex>
        <Outlet />
    </Box>
)