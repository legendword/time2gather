import { Box, Flex, HStack, Text, Tooltip } from "@chakra-ui/react"
import moment from "moment"
import { EventObject } from "../pages/Event"
import { interpolateColors } from "../util/colors"
import leadingZeros from "../util/leadingZeros"


export const MyAvailability = (props: { dates: Array<string>, available: Array<string>, mouseOver: (ev: any, time: string) => void }) => {

    const getDate = (date: string) => {
        return moment(date, 'YYYY-MM-DD').format('MMM D')
    }
    const intervalHours = 0, intervalMinutes = 30;
    const timeStops: Array<string> = [];
    const timeEnds: Array<string> = [];
    for (let i = 0; i < 24; i += intervalHours + 1) {
        for (let j = 0; j < 60; j += intervalMinutes) {
            let beginTime = `${leadingZeros(i)}:${leadingZeros(j)}`;
            let endTime = `${leadingZeros(i)}:${leadingZeros(j+intervalMinutes-1)}`;
            timeStops.push(beginTime);
            timeEnds.push(endTime);
        }
    }

    const getColor = (timeStr: string) => {
        if (props.available.includes(timeStr)) return 'green.800';
        else return ''
    }

    return (
        <Box>
            <Flex justify="center" gap="10px">
                <Box textAlign="center" w="10">
                    <Text visibility="hidden">Time Slots</Text>
                    <Flex mt="-1" direction="column" minH="50vh">
                        {
                            timeStops.filter((v, ind) => ind % 2 == 0).map((t, ind) => (
                                <Box className="box-double" fontSize="10px" key={ind}>
                                    {t}
                                </Box>
                            ))
                        }
                    </Flex>
                </Box>
                {
                    props.dates.map(v => (
                        <Box textAlign="center" w="10" key={v}>
                            <Text>{getDate(v)}</Text>
                            <Flex direction="column" minH="50vh">
                                {
                                    timeStops.map((t, ind) => (
                                        <Box bg={getColor(`${v} ${t}`)} className="box-shade" key={ind} onMouseOver={(ev) => props.mouseOver(ev, `${v} ${t}`)}>
                                        </Box>
                                    ))
                                }
                            </Flex>
                        </Box>
                    ))
                }
                <Box textAlign="center" w="10">

                </Box>
            </Flex>
        </Box>
    )
}