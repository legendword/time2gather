import { Box, Flex, HStack, Text, Tooltip } from "@chakra-ui/react"
import moment from "moment"
import { EventObject } from "../pages/Event"
import { interpolateColors } from "../util/colors"
import leadingZeros from "../util/leadingZeros"


export const GroupAvailability = (props: { event: EventObject, onMouseEnter: (time: string, timeRange: string) => void, onMouseLeave: (time: string) => void }) => {

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

    let availabilityMap: any = {}
    for (let i of props.event.data) {
        for (let j of i.available) {
            (availabilityMap[j] ? availabilityMap[j].push(i.name) : availabilityMap[j] = [i.name])
        }
    }

    const attendeeCount = props.event.data.length;
    const colors = interpolateColors("rgb(255, 255, 255)", "rgb(28, 69, 50)", attendeeCount + 1).map((v) => `rgb(${v.join(',')})`);
    const getColor = (timeStr: string) => {
        let colorLevel = availabilityMap[timeStr] == null ? 0 : availabilityMap[timeStr].length;
        return colors[colorLevel];
    }
    const getTimeRangeStr = (time: string, ind: number) => {
        return `${time} - ${timeEnds[ind]}`
    }
    // deprecated: used for tooltip label
    const getLabel = (timeStr: string, ind: number) => {
        let available = availabilityMap[timeStr] == null ? [] : availabilityMap[timeStr];
        let unavailable = props.event.data.map(v => v.name).filter(v => !available.includes(v))
        return `${timeStr} - ${timeEnds[ind]} [Available: ${available.join(', ')}] [Unavailable: ${unavailable.join(', ')}]`
    }

    // console.log(colors, availabilityMap)

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
                    props.event.dates.map(v => (
                        <Box textAlign="center" w="10" key={v}>
                            <Text>{getDate(v)}</Text>
                            <Flex direction="column" minH="50vh">
                                {
                                    timeStops.map((t, ind) => (
                                        <Box key={ind} backgroundColor={getColor(`${v} ${t}`)} className="box-shade" onMouseEnter={() => props.onMouseEnter(`${v} ${t}`, getTimeRangeStr(`${v} ${t}`, ind))} onMouseLeave={() => props.onMouseLeave(`${v} ${t}`)}>
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
            <Box h="20"></Box>
        </Box>
    )
}