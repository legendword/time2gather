import { Box, Flex, Text } from "@chakra-ui/react"
import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { EventObject } from "../pages/Event"
import { interpolateColors } from "../util/colors"
import leadingZeros from "../util/leadingZeros"
import { isOverflown } from "../util/overflow"


export const GroupAvailability = (props: { event: EventObject, onMouseEnter: (time: string, timeRange: string) => void, onMouseLeave: (time: string) => void }) => {

    const getDateMonth = (date: string) => {
        return moment(date, 'YYYY-MM-DD').format('MMM')
    }
    const getDateDay = (date: string) => {
        return moment(date, 'YYYY-MM-DD').format('D')
    }
    const intervalHours = 0, intervalMinutes = 30;
    const timeStops: Array<string> = [];
    const timeEnds: Array<string> = [];
    for (let i = props.event.times[0]; i < props.event.times[1]; i += intervalHours + 1) {
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
    /*
    const getLabel = (timeStr: string, ind: number) => {
        let available = availabilityMap[timeStr] == null ? [] : availabilityMap[timeStr];
        let unavailable = props.event.data.map(v => v.name).filter(v => !available.includes(v))
        return `${timeStr} - ${timeEnds[ind]} [Available: ${available.join(', ')}] [Unavailable: ${unavailable.join(', ')}]`
    }
    */

    // console.log(colors, availabilityMap)


    // workaround for inaccessible areas when flexbox with (justify-content: center) has overflow; see https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
    const overflowRef = useRef(null);
    const [overflown, setOverflown] = useState(false);

    const calculateOverflow = () => {
        const element = overflowRef.current;
        const iof = isOverflown(element)
        // console.log('resize', overflown, iof)
        setOverflown(iof)
    }

    useEffect(() => {
        window.addEventListener("resize", calculateOverflow);

        calculateOverflow()

        return () => window.removeEventListener("resize", calculateOverflow);
    }, [overflown]) // need to re-apply eventListener; see https://stackoverflow.com/questions/53845595/wrong-react-hooks-behaviour-with-event-listener


    return (
        <Box>
            <Box w="100%" overflowX="auto" ref={overflowRef}>
                <Flex justify={overflown ? "unset" : "center"} gap="10px">
                    <Box textAlign="center" minW="10" w="10" mx={overflown ? "auto" : "unset"}>
                        <Text visibility="hidden" h="14">Time Slots</Text>
                        <Flex mt="-2" direction="column">
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
                            <Box textAlign="center" minW="10" w="10" key={v} mx={overflown ? "auto" : "unset"}>
                                <Box h="14">
                                    <Text>{getDateMonth(v)}</Text>
                                    <Text>{getDateDay(v)}</Text>
                                </Box>
                                <Flex direction="column">
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
                    <Box textAlign="center" minW="10" w="10" mx={overflown ? "auto" : "unset"}>
                    </Box>
                </Flex>
            </Box>
            
            <Box h="20"></Box>
        </Box>
    )
}