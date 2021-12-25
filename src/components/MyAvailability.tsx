import { Box, Button, Center, Flex, Text } from "@chakra-ui/react"
import moment from "moment"
import { useEffect, useState } from "react"
import leadingZeros from "../util/leadingZeros"


export const MyAvailability = (props: { allowEdits: boolean, dates: Array<string>, times: Array<number>, available: Array<string>, onSubmitEdit: (available: Array<string>) => void }) => {
    const enableDrafts = props.allowEdits || props.available.length == 0;
    const [draftAvailable, setDraftAvailable] = useState<Array<string>>(props.available);
    const [draftTimes, setDraftTimes] = useState<Array<string>>([]);
    const [draftMode, setDraftMode] = useState<boolean>(false); // true: toggle on, false: toggle off
    const [hasEdited, setHasEdited] = useState<boolean>(false);

    useEffect(() => {
        setHasEdited(false)
    }, [props.available])

    const getDateMonth = (date: string) => {
        return moment(date, 'YYYY-MM-DD').format('MMM')
    }
    const getDateDay = (date: string) => {
        return moment(date, 'YYYY-MM-DD').format('D')
    }
    const intervalHours = 0, intervalMinutes = 30;
    const timeStops: Array<string> = [];
    const timeEnds: Array<string> = [];
    for (let i = props.times[0]; i < props.times[1]; i += intervalHours + 1) {
        for (let j = 0; j < 60; j += intervalMinutes) {
            let beginTime = `${leadingZeros(i)}:${leadingZeros(j)}`;
            let endTime = `${leadingZeros(i)}:${leadingZeros(j+intervalMinutes-1)}`;
            timeStops.push(beginTime);
            timeEnds.push(endTime);
        }
    }

    const getColor = (timeStr: string) => {
        if (draftTimes.includes(timeStr)) return (draftMode ? 'green.600' : '');
        if (draftAvailable.includes(timeStr)) return 'green.800';
        return '';
    }

    const draftSelect = (time: string) => {
        if (draftTimes.includes(time)) {
            setDraftTimes(draftTimes.filter(v => v != time))
        }
        else {
            setDraftTimes([...draftTimes, time])
        }
    }

    const mouseDown = (time: string) => {
        if (!enableDrafts) return;
        setDraftMode(!draftAvailable.includes(time));
        setDraftTimes([time]);
    }

    const mouseOver = (ev: any, time: string) => {
        if ([1, 3, 5].includes(ev.buttons)) {
            ev.preventDefault();
            if (!enableDrafts) return;
            draftSelect(time);
        }
    }

    const mouseUp = () => {
        if (!enableDrafts) return;
        if (draftTimes.length !== 0) {
            toggleAvailable(draftTimes, draftMode);
            setDraftTimes([]);
        }
    }

    const toggleAvailable = (times: Array<string>, mode: boolean) => {
        const newAvailable = (mode ? [...draftAvailable, ...times.filter(v => !draftAvailable.includes(v))] : draftAvailable.filter(v => !times.includes(v)));
        setDraftAvailable(newAvailable);
        setHasEdited(true);
    }

    const saveChanges = () => {
        if (!enableDrafts || !hasEdited) return;
        props.onSubmitEdit(draftAvailable);
    }

    return (
        <Box>
            <Box w="100%" overflowX="auto">
                <Flex gap="10px">
                    <Box textAlign="center" minW="10" m="auto">
                        <Text visibility="hidden" h="14">Time Slots</Text>
                        <Flex mt="-3" direction="column">
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
                            <Box textAlign="center" minW="10" m="auto" key={v}>
                                <Box h="14">
                                    <Text>{getDateMonth(v)}</Text>
                                    <Text>{getDateDay(v)}</Text>
                                </Box>
                                <Flex direction="column">
                                    {
                                        timeStops.map((t, ind) => (
                                            <Box bg={getColor(`${v} ${t}`)} className="box-shade" key={ind} onMouseOver={(ev) => mouseOver(ev, `${v} ${t}`)} onMouseDown={() => mouseDown(`${v} ${t}`)} onMouseUp={() => mouseUp()}>
                                            </Box>
                                        ))
                                    }
                                </Flex>
                            </Box>
                        ))
                    }
                    <Box textAlign="center" minW="10" m="auto">
                    </Box>
                </Flex>
            </Box>
            <Center mt={5}>
            {
                (enableDrafts && hasEdited) ? (
                    <Button onClick={saveChanges}>Save</Button>
                ) : (
                    <Button isDisabled>Saved</Button>
                )
            }
            </Center>
        </Box>
    )
}