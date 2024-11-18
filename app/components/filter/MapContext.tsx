"use client";
import {createContext, useState, ReactNode} from "react";
import {Dayjs} from "dayjs";
import {Feature, GeoJsonProperties, Geometry} from "geojson";
import FeaturePopup from "@/app/components/map/FeaturePopup";
import {any} from "prop-types";

interface MapContextType {
    county: string | '';
    landscape: string | '';
    conservancyType: string | '';
    landscapeId: number;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    projects: any;
    selectedFeature: Feature | null;
    detailedPopupOpen: boolean;
    setCounty: (county: string) => void;
    setStartDate: (date: Dayjs | null) => void;
    setEndDate: (date: Dayjs | null) => void;
    setLandscape: (landscape: string) => void;
    setConservancyType: (conservancyType: string) => void;
    setLandscapeId: (id: number) => void;
    setProjects: (projects: any | null) => void;
    setSelectedFeature: (selectedFeature: Feature | null) => void;
    setDetailedPopupOpen: (detailedPopupOpen: boolean) => void;
}

export const MapContext = createContext<MapContextType>({
    county: '',
    detailedPopupOpen: false,
    startDate: null,
    endDate: null,
    landscapeId: 0,
    landscape: '',
    conservancyType: '',
    projects: null,
    selectedFeature: null,
    setCounty: () => {},
    setStartDate: () => {
    },
    setEndDate: () => {
    },
    setLandscape: () => {
    },
    setLandscapeId: () => {
    },
    setProjects: () => {},
    setSelectedFeature: () => {},
    setConservancyType: () => {},
    setDetailedPopupOpen: () => void {},

});

export const MapContextProvider = ({children}: { children: ReactNode }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [landscape, setLandscape] = useState<string>('')
    const [county, setCounty] = useState<string>('')
    const [detailedPopupOpen, setDetailedPopupOpen] = useState<boolean>(false)
    const [conservancyType, setConservancyType] = useState<string>('')
    const [landscapeId, setLandscapeId] = useState<number>(0)
    const [projects, setProjects] = useState<any>(null)
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
    return (
        <MapContext.Provider
            value={{
                county: county,
                detailedPopupOpen: detailedPopupOpen,
                landscape: landscape,
                conservancyType: conservancyType,
                landscapeId: landscapeId,
                startDate: startDate,
                endDate: endDate,
                projects: projects,
                selectedFeature: selectedFeature,
                setCounty,
                setStartDate,
                setEndDate,
                setLandscape: setLandscape,
                setLandscapeId: setLandscapeId,
                setProjects: setProjects,
                setSelectedFeature: setSelectedFeature,
                setConservancyType: setConservancyType,
                setDetailedPopupOpen: setDetailedPopupOpen
            }}
        >
            {children}
        </MapContext.Provider>
    );
};
