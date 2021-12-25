import {
    ChakraProvider,
    theme,
} from "@chakra-ui/react"
import { Routes, Route } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { Event } from "./pages/Event"
import { Header } from "./Header"
import { NewEvent } from "./pages/NewEvent"
import "./css/App.scss"

export const App = () => (
    <ChakraProvider theme={theme}>
        <Routes>
            <Route path="/about" element={<Landing />}></Route>
            <Route element={<Header />}>
                <Route path="/" element={<NewEvent />}></Route>
                <Route path=":id" element={<Event />}></Route>
            </Route>
        </Routes>
    </ChakraProvider>
)
