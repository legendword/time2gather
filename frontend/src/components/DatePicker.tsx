import { Box, Button, Flex, Grid, GridItem, IconButton, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import moment from "moment"
import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Day {
    date: string,
    day: number
}

export const DatePicker = (props: { selected: Array<string>, onUpdate: (val: Array<string>) => void }) => {
    const buttonSize = useBreakpointValue({ base: 'sm', md: 'md'})

    const today = moment().format('YYYY-MM-DD')

    const [days, setDays] = useState<Day[]>([])
    const [week, setWeek] = useState<string[]>([])
    const [title, setTitle] = useState<string>('')

    const generate = (anchorDate: string) => {
        let weekday = moment(anchorDate, 'YYYY-MM-DD').weekday()
        let t = moment(anchorDate, 'YYYY-MM-DD').subtract(weekday, 'days')
        let days = []
        let week = []
        for (let i = 0; i < 35; i++) {
            days.push({
                date: t.format('YYYY-MM-DD'),
                day: t.date()
            });
            if (i < 7) week.push(t.format('ddd'))
            t.add(1, 'day')
        }
        let firstDay = moment(days[0].date, 'YYYY-MM-DD'), lastDay = moment(days[34].date, 'YYYY-MM-DD')

        setDays(days)
        setWeek(week)
        setTitle(`${firstDay.format('MMM') + (firstDay.month() == 11 ? ' ' + firstDay.format('YYYY') : '')} to ${lastDay.format('MMM')} ${lastDay.format('YYYY')}`)
    }

    const prev = () => {
        generate(moment(days[0].date).subtract(35, 'days').format('YYYY-MM-DD'))
    }

    const next = () => {
        generate(moment(days[0].date).add(35, 'days').format('YYYY-MM-DD'))
    }

    const clickDate = (date: string) => {
        let i = props.selected.indexOf(date)
        if (i != -1) {
            props.onUpdate(props.selected.filter(v => v != date))
        }
        else {
            props.onUpdate([...props.selected, date])
        }
    }

    useEffect(() => {
        generate(today)
    }, [])

    return (
        <VStack spacing={6}>
            <Grid templateColumns="repeat(7, 1fr)" gap={[2, 4, 5]}>
                <GridItem colSpan={7}>
                    <Flex justifyContent="space-between" alignItems="center" w="100%">
                        <Box>
                            <IconButton colorScheme="teal" variant="ghost" icon={<FaChevronLeft />} aria-label="Previous Period" onClick={() => prev()} />
                        </Box>
                        <Box>
                            <Text fontSize="lg">{title}</Text>
                        </Box>
                        <Box>
                            <IconButton colorScheme="teal" variant="ghost" icon={<FaChevronRight />} aria-label="Next Period" onClick={() => next()} />
                        </Box>
                    </Flex>
                </GridItem>
                {week.map((v, ind) => (
                    <Box key={ind} fontSize="md" textColor="teal.600" fontWeight="bold">{v}</Box>
                ))}
                {days.map((v, ind) => (
                    <Button colorScheme="teal" size={buttonSize} variant={props.selected.includes(v.date) ? 'solid' : 'outline'} onClick={() => clickDate(v.date)} key={ind} textDecoration={v.date == today ? 'underline' : 'none'}>{v.day}</Button>
                ))}
            </Grid>
        </VStack>
    )
}