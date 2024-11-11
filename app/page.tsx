'use client'
// import ProjectMap from "@/app/components/map/ProjectMap";
import dynamic from "next/dynamic";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import * as React from "react";

const ProjectMap = dynamic(() => import('@/app/components/map/ProjectMap'), {
    ssr: false
});

const queryClient = new QueryClient()
export default function ProjectsMapPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <ProjectMap/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>

    )
}