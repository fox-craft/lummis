import React, {
    useState,
    useContext,
    useEffect,
    useRef,
    SyntheticEvent,
} from "react";
import {Slider, Grid, Button, Box, Tooltip, IconButton} from "@mui/material";
import {Dayjs} from "dayjs";
import {
    PauseOutlined,
    PlayArrowOutlined,
    SkipNextRounded,
    SkipPreviousOutlined
} from "@mui/icons-material";
import {FilterContext} from "@/app/components/filter/FilterContext";

interface TimeSeriesSliderProps {
    onChangeCommit: (
        // selectedDate: Dayjs
        selectedDate: string
    ) => void;
}

const TimeSeriesSlider: React.FC<TimeSeriesSliderProps> = ({
                                                               onChangeCommit,
                                                           }) => {
    const {startDate, endDate,} = useContext(FilterContext);
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [marks, setMarks] = useState<
        { value: number; label: string; fullLabel: string }[]
    >([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const playRef = useRef<NodeJS.Timeout | null>(null);
    const sliderValueRef = useRef<number>(0);
    const timeInterval = 'yearly'

    useEffect(() => {
        if (startDate && endDate) {
            console.log(
                `Start date ${startDate} to End date ${endDate} with ${timeInterval} interval`
            );
            generateRange(startDate, endDate, timeInterval);
        }
        return () => {
            if (playRef.current) {
                clearInterval(playRef.current);
            }
        };
    }, [startDate, endDate, timeInterval]);

    const generateRange = (start: Dayjs, end: Dayjs, interval: string) => {
        const ranges = [];
        let current = start;
        console.log(`Start Date: ${start}`)
        let markIndex = 0;
        while (current.isBefore(end) || current.isSame(end)) {
            console.log("Current", current);
            let label = current.format("DD");
            let fullLabel = current.format("YYYY-MM-DD");
            let value = markIndex;

            if (interval === "yearly") {
                fullLabel = current.format("YYYY");
                label = current.format("YYYY");
                current = current.add(1, "year");
            } else if (interval === "monthly") {
                fullLabel = current.startOf('month').format("YYYY-MM-DD");
                label = current.format("MM");
                current = current.add(1, "month");
            } else if (interval === "daily") {
                fullLabel = current.format("YYYY-MM-DD");
                label = current.format("DD");
                current = current.add(1, "day");
            }
            ranges.push({value: value, label: label, fullLabel: fullLabel});
            // ranges.map(r => console.log(`Range values ${r}`))}
            markIndex++;
        }
        console.log(`Range range ${ranges.map((r) => (r.fullLabel.toString()))}`);
        setMarks(ranges);
        sliderValueRef.current = 0;
        setSliderValue(0);
    };

    const getSelectedDate = (selectedValue: number): any => {
        return marks.find((m) => m.value === selectedValue);
    };
    const handleSliderChangeCommitted = (
        event: Event | SyntheticEvent<Element, Event>,
        value: number | number[]
    ) => {
        const selectedValue = Array.isArray(value) ? value[0] : value;
        const selectedDate = getSelectedDate(selectedValue);
        if (selectedDate) {
            onChangeCommit(selectedDate.fullLabel);
        }
    };

    const handlePlayPause = () => {
        //setIsPlaying(!isPlaying);
        if (isPlaying) {
            if (playRef.current) clearInterval(playRef.current);
            //clearInterval(playRef.current as NodeJS.Timeout);
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            playRef.current = setInterval(() => {
                sliderValueRef.current += 1;
                if (sliderValueRef.current >= marks.length) {
                    clearInterval(playRef.current as NodeJS.Timeout);
                    setIsPlaying(false);
                    return;
                }
                setSliderValue(sliderValueRef.current);
                const selectedDate = getSelectedDate(sliderValueRef.current);
                if (selectedDate) onChangeCommit(selectedDate.fullLabel);
            }, 4000); // Adjust the interval as needed
            console.log("Selected value " + sliderValueRef.current);
            //return sliderValueRef.current;
        }
    };

    const handleForward = () => {
        if (playRef.current) clearInterval(playRef.current); // Clear interval if playing
        setIsPlaying(false); // Set playing state to false
        sliderValueRef.current = Math.min(
            sliderValueRef.current + 1,
            marks.length - 1
        ); // Increment ref value
        setSliderValue(sliderValueRef.current); // Update slider value state
        const selectedDate = getSelectedDate(sliderValueRef.current);
        if (selectedDate) onChangeCommit(selectedDate.fullLabel);
        console.log("Selected value " + sliderValueRef.current);
        //return sliderValueRef.current;
    };

    const handlePrevious = () => {
        if (playRef.current) clearInterval(playRef.current); // Clear interval if playing
        setIsPlaying(false); // Set playing state to false
        sliderValueRef.current = Math.max(sliderValueRef.current - 1, 0); // Decrement ref value
        setSliderValue(sliderValueRef.current); // Update slider value state
        const selectedDate = getSelectedDate(sliderValueRef.current);
        if (selectedDate) onChangeCommit(selectedDate.fullLabel);
        console.log("SelectedDate " + sliderValueRef.current);
        //return sliderValueRef.current;
    };

    const valuetext = (value: number) => {
        const mark = marks.find((mark) => Number(mark.value) === value);
        return mark ? mark.fullLabel : "";
    };

    return (
        <Box sx={{width: "100%", paddingLeft: "18px"}}>
            {startDate && endDate && (
                <Grid container sx={{height: "100%"}}>
                    <Grid item xs={2} sx={{display: "flex", flexDirection: "row"}}>
                        <Button sx={{ color: "#ff8833" }} onClick={handlePlayPause}>
                            {isPlaying ? <PauseOutlined/> : <PlayArrowOutlined/>}
                        </Button>
                        <IconButton sx={{ color: "#ff8833" }} onClick={handleForward}>
                            <SkipNextRounded/>
                        </IconButton>
                        <Button sx={{ color: "#ff8833" }} onClick={handlePrevious}>
                            <SkipPreviousOutlined/>
                        </Button>
                    </Grid>
                    <Grid item xs={10}>
                        <Slider
                            size="small"
                            sx={{ color: "#ff8833" }}
                            value={sliderValue}
                            min={0}
                            max={marks.length - 1}
                            step={1}
                            //value={sliderValue}
                            onChange={(_, value) => {
                                sliderValueRef.current = value as number;
                                setSliderValue(value as number);
                            }}
                            //valueLabelFormat={(value) => marks[value as number].fullLabel}
                            marks={marks.map((mark, markIndex) => ({
                                value: markIndex,
                                //newvalue: Number(mark.value),
                                label: mark.label,
                                tooltip: (
                                    <Tooltip title={mark.fullLabel} arrow>
                                        <span>{mark.label}</span>
                                    </Tooltip>
                                ),
                            }))}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            onChangeCommitted={handleSliderChangeCommitted}
                        />
                    </Grid>

                </Grid>
            )}
        </Box>
    );
};

export default TimeSeriesSlider;
