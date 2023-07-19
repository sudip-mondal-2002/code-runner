import {Problem} from "@prisma/client";
import React from "react";
import axios from "axios";

export const useProblemDetails = (id: string) => {
    const API_PATH = `/api/problems/${id}`
    const [problem, setProblem] = React.useState<Problem>()
    React.useEffect(() => {
        axios.get(API_PATH).then((res) => {
            setProblem(res.data)
        })
    },[])
    return {
        problem
    }
}