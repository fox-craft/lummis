'use client'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import * as React from "react";
import dynamic from "next/dynamic";

const KoboMap = dynamic(() => import('@/app/components/kobo/KoboMap'), {
    ssr: false
});
const queryClient = new QueryClient()
export default function ProjectsMapPage() {

    return (
        <QueryClientProvider client={queryClient}>
            <KoboMap/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>

    )
}