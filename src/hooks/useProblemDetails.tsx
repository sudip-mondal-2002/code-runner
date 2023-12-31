import {Problem, TestCase} from "@prisma/client";
import React from "react";
import axios from "axios";

export const useProblemDetails = (id: string) => {
    const API_PATH = `/api/problems/${id}`
    const [problem, setProblem] = React.useState<Problem & {testcases: TestCase[]}>()
    React.useEffect(() => {
        axios.get(API_PATH).then((res) => {
            setProblem(res.data)
        })
    },[])
    return {
        problem
    }
}