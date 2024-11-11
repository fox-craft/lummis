"use client";
import {createContext, useState, ReactNode} from "react";
import {Dayjs} from "dayjs";

interface MapContextType {
    landscape: string | '';
    conservancyType: string | '';
    landscapeId: number;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    projects: any,
    beneficiaries: any,
    setStartDate: (date: Dayjs | null) => void;
    setEndDate: (date: Dayjs | null) => void;
    setLandscape: (landscape: string) => void;
    setConservancyType: (conservancyType: string) => void;
    setLandscapeId: (id: number) => void;
    setProjects: (projects: any | null) => void;
    setBeneficiaries: (beneficiaries: any | null) => void;
}

export const FilterContext = createContext<MapContextType>({
    startDate: null,
    endDate: null,
    landscapeId: 0,
    landscape: '',
    conservancyType: '',
    projects: null,
    beneficiaries: null,
    setStartDate: () => {
    },
    setEndDate: () => {
    },
    setLandscape: () => {
    },
    setLandscapeId: () => {
    },
    setProjects: () => {},
    setBeneficiaries: () => {},
    setConservancyType: () => {}

});

export const FilterProvider = ({children}: { children: ReactNode }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [landscape, setLandscape] = useState<string>('')
    const [conservancyType, setConservancyType] = useState<string>('')
    const [landscapeId, setLandscapeId] = useState<number>(0)
    const [projects, setProjects] = useState<any>(null)
    const [beneficiaries, setBeneficiaries] = useState<any>(null)
    return (
        <FilterContext.Provider
            value={{
                landscape: landscape,
                conservancyType: conservancyType,
                landscapeId: landscapeId,
                startDate: startDate,
                endDate: endDate,
                projects: projects,
                beneficiaries: beneficiaries,
                setStartDate,
                setEndDate,
                setLandscape: setLandscape,
                setLandscapeId: setLandscapeId,
                setProjects,
                setBeneficiaries,
                setConservancyType
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
