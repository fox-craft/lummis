import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import dayjs from "dayjs";

const GEOSERVER_BASE_URL = process.env.GEOSERVER_BASE_URL
const BACKEND_URL = 'http://localhost:8000'

export type Project = {
    id?: number;
    statusActive?: boolean;
    firstName?: string;
    lastName?: string;
    county?: string;
    countyID?: number;
    subCountyID?: number;
    email?: null;
    gender?: string;
    telephone?: string;
    farms?: Farms[];
}

export type Farms = {
    id?: number;
    crop?: string;
    acreage?: number;
    practise?: string;
}

export type ProjectDetail = {
    id?: number;
    status?: string;
    projectName?: string;
    contractor?: string;
    county?: string;
    countyID?: number;
    subCountyID?: number;
    beneficiaryCategory?: string;
    budget?: number;
    actualCost?: number;
    estimatedBeneficiaries?: number;
    startDate?: string;
    endDate?: string;
    objectives?: string;
    theme?: string;
}

type ProjectDetails = ReadonlyArray<ProjectDetail>

type GeoserverLayers = {
    layers?: Layers;
}

type Layers = {
    layer?: Layer[];
}

type Layer = {
    name?: string;
    href?: string;
}

export const useLayersQuery = (workspace: string) => {
    return useQuery({
        queryKey: ['layers', workspace],
        queryFn: () => fetchLayers(workspace)
    })
}


const fetchLayers = async (workspace: string): Promise<GeoserverLayers> => {
    //http://localhost:8080/geoserver/rest/workspaces/flloca/layers.json
    const res = await axios.get(`${GEOSERVER_BASE_URL}/rest/workspaces${workspace}/layers.json`)
    return res.data
}

export const useProjectsQuery = (countyName: string) => {
    return useQuery<ProjectDetails, Error>({
        queryKey: ['projects', countyName],
        queryFn: () => fetchProjects(countyName)
    })
}

const fetchProjects = async (countyName: string): Promise<ProjectDetails> => {
    const response = await axios.get(`${BACKEND_URL}/projects`);
    return response.data;
};

export const useProjectQuery = (projectId: number) => {
    return useQuery<ProjectDetail, Error>({
        queryKey: ['project', projectId],
        queryFn: () => fetchProject(projectId)
    })
}
const fetchProject = async (projectId: number): Promise<ProjectDetail> => {
    const response = await axios.get(`${BACKEND_URL}/project?project_id=${projectId}`);
    return response.data;
};


export const useProjectLocationsQuery = (countyName: string) => {
    return useQuery({
        queryKey: ['p_locations', countyName],
        queryFn: () => fetchProjectLocations(countyName)
    })
}

const fetchProjectLocations = async (county: string) => {
    const res = await axios.get(`${BACKEND_URL}/projects/locations`)
    return res.data
}

export const useBeneficiariesQuery = (countyName: string) => {
    return useQuery({
        queryKey: ['beneficiaries', countyName],
        queryFn: () => fetchBeneficiaries(countyName)
    })
}

const fetchBeneficiaries = async (county: string) => {
    const res = await axios.get(`${BACKEND_URL}/beneficiaries`)
    return res.data
}