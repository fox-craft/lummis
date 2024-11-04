"use client";
import {createContext, useState, ReactNode} from "react";
import {Dayjs} from "dayjs";

interface MapContextType {
    countyName: string | '';
    countyId: number;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    projects: any,
    beneficiaries: any,
    setStartDate: (date: Dayjs | null) => void;
    setEndDate: (date: Dayjs | null) => void;
    setCountyName: (countyName: string) => void;
    setCountyId: (countyId: number) => void;
    setProjects: (projects: any | null) => void;
    setBeneficiaries: (beneficiaries: any | null) => void;
}

export const FilterContext = createContext<MapContextType>({
    startDate: null,
    endDate: null,
    countyId: 0,
    countyName: '',
    projects: null,
    beneficiaries: null,
    setStartDate: () => {
    },
    setEndDate: () => {
    },
    setCountyName: () => {
    },
    setCountyId: () => {
    },
    setProjects: () => {},
    setBeneficiaries: () => {},

});

export const FilterProvider = ({children}: { children: ReactNode }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [countyName, setCountyName] = useState<string>('')
    const [countyId, setCountyId] = useState<number>(0)
    const [projects, setProjects] = useState<any>(null)
    const [beneficiaries, setBeneficiaries] = useState<any>(null)
    return (
        <FilterContext.Provider
            value={{
                countyName: countyName,
                countyId: countyId,
                startDate: startDate,
                endDate: endDate,
                projects: projects,
                beneficiaries: beneficiaries,
                setStartDate,
                setEndDate,
                setCountyName,
                setCountyId,
                setProjects,
                setBeneficiaries,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
