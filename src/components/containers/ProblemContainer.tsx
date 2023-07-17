"use client"
import { useParams } from 'next/navigation';
import {useProblemDetails} from "@/hooks/useProblemDetails";

export const ProblemContainer = ({}) => {
    const {problemId} = useParams()
    const {problem} = useProblemDetails(problemId)
    return <>
        {problem?.name}
        {problem?.description}
    </>
}