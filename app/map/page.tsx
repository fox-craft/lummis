'use client'
// import ProjectMap from "@/app/components/map/ProjectMap";
import dynamic from "next/dynamic";

const ProjectMap = dynamic(() => import('@/app/components/map/ProjectMap'), {
    ssr: false
});
export default function ProjectsMapPage() {
    return (
        <ProjectMap/>
    )
}