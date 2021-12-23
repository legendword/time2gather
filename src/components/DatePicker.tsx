import * as React from "react"
import { Box, Button, Flex, Grid, GridItem, IconButton, Text, VStack } from "@chakra-ui/react"
import moment from "moment"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Day {
    date: string,
    day: number
}

export class DatePicker extends React.Component<{ selected: Array<string>,  onUpdate: (val: Array<string>) => void }, { days: Array<Day>, week: Array<string>, title: string}> {
    today: string = moment().format('YYYY-MM-DD')

    constructor(props: any) {
        super(props)
        this.state = {
            days: [],
            week: [],
            title: ''
        }
    }

    render() {
        return (
            <VStack spacing={6}>
                <Grid templateColumns="repeat(7, 1fr)" gap={6}>
                    <GridItem colSpan={7}>
                        <Flex justifyContent="space-between" alignItems="center" w="100%">
                            <Box>
                                <IconButton colorScheme="teal" variant="ghost" icon={<FaChevronLeft />} aria-label="Previous Period" onClick={() => this.goPrev()} />
                            </Box>
                            <Box>
                                <Text fontSize="lg">{this.state.title}</Text>
                            </Box>
                            <Box>
                                <IconButton colorScheme="teal" variant="ghost" icon={<FaChevronRight />} aria-label="Next Period" onClick={() => this.goNext()} />
                            </Box>
                        </Flex>
                    </GridItem>
                    {this.state.week.map((v, ind) => (
                        <Box key={ind} fontSize="md" textColor="teal.600" fontWeight="bold">{v}</Box>
                    ))}
                    {this.state.days.map((v, ind) => (
                        <Button colorScheme="teal" variant={this.props.selected.includes(v.date) ? 'solid' : 'outline'} onClick={() => this.clickDate(v.date)} key={ind} textDecoration={v.date == this.today ? 'underline' : 'none'}>{v.day}</Button>
                    ))}
                </Grid>
            </VStack>
        )
    }

    clickDate(date: string) {
        let i = this.props.selected.indexOf(date)
        if (i != -1) {
            this.props.onUpdate(this.props.selected.filter(v => v != date))
        }
        else {
            this.props.onUpdate([...this.props.selected, date])
        }
    }

    componentDidMount() {
        this.generate(this.today)
    }

    goPrev() {
        this.generate(moment(this.state.days[0].date).subtract(35, 'days').format('YYYY-MM-DD'))
    }

    goNext() {
        this.generate(moment(this.state.days[0].date).add(35, 'days').format('YYYY-MM-DD'))
    }

    generate(anchorDate: string) {
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

        this.setState({
            days: days,
            week: week,
            title: `${firstDay.format('MMM') + (firstDay.month() == 11 ? ' ' + firstDay.format('YYYY') : '')} to ${lastDay.format('MMM')} ${lastDay.format('YYYY')}`
        })
    }
}
