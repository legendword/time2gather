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
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { Routes, Route, Link as RouterLink } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { Event } from "./pages/Event"
import { Header } from "./Header"
import { NewEvent } from './pages/NewEvent'

export const App = () => (
    <ChakraProvider theme={theme}>
        <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="new" element={<NewEvent />}></Route>
            <Route element={<Header />}>
                <Route path="about"></Route>
                <Route path=":id" element={<Event />}></Route>
            </Route>
        </Routes>
    </ChakraProvider>
)
