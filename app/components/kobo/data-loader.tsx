import axios from "axios";
import {useQuery} from "@tanstack/react-query";
const fs = typeof window === "undefined" ? require("fs") : null;

const KOBO_URL = "https://kf.kobotoolbox.org/api/v2";
const KOBO_KEY_URL = "https://kf.kobotoolbox.org/token/?format=json"
const API_KEY =process.env.NEXT_PUBLIC_KOBO_TOKEN;

export const use_kobo_data = () => {
    return useQuery<JSON>({
        queryKey: ['kobo-data'],
        queryFn: () => get_kobo_data()
    })
}

const get_kobo_data = async (): Promise<any> => {
    const token = await get_token();
    console.log(token)
    if (token !== "" && token !== undefined) {
        console.log("Found token", token);
        console.log(KOBO_URL)
        const response = await fetch(`${KOBO_URL}/assets/a3Jdrrnzxanx2XV3D93Fdi/data.json`, {
                headers: {'Authorization': `Token ${token}`},
            }
        )
        console.log(`Kobo response ${JSON.stringify(response)}`)
        return response.json()
    }
}

export const use_kobo_asset = async () => {
    return useQuery(
        {
            queryKey: ['asset'],
            queryFn: () => get_kobo_data()
        }
    )
}
const get_asset = async (): Promise<JSON> => {
    const res = await axios.get(`${KOBO_URL}/assets.json`, {
        headers: {'Authorization': `Token ${API_KEY}`},
    })
    return res.data
}

const get_token = async (): Promise<any> => {
    try {
        const res = await axios.get(KOBO_KEY_URL)
        return res.data.token
    } catch (error) {
        console.error(error)
    }

}


interface InputData {
    _id: number;
    "_1_Enter_title_number": string;
    "_2_Farmer_Full_name": string;
    "_3_Farmer_description": string;
    "_4_Farmer_National_ID": string;
    "_5_Farmer_Telephone": string;
    "_6_Add_farm_crops": string;
    Land_area: string;
}

interface GeoJSON {
    type: string;
    features: Array<{
        type: string;
        properties: Record<string, any>;
        geometry: {
            type: string;
            coordinates: number[][][];
        };
    }>;
}

export function convertToGeoJSON(filePath: string): GeoJSON {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData: InputData = JSON.parse(rawData);

    const coordinates = jsonData.Land_area.split(';').map(coord => {
        const [lat, lng] = coord.split(' ').map(Number);
        return [lng, lat]; // Swap lat and lng
    });

    const geoJSON: GeoJSON = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: {
                    id: jsonData._id,
                    title_number: jsonData["_1_Enter_title_number"],
                    farmer_name: jsonData["_2_Farmer_Full_name"],
                    description: jsonData["_3_Farmer_description"],
                    national_id: jsonData["_4_Farmer_National_ID"],
                    telephone: jsonData["_5_Farmer_Telephone"],
                    crops: jsonData["_6_Add_farm_crops"],
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [coordinates],
                },
            },
        ],
    };

    return geoJSON;
}

