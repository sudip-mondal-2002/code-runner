import React from "react";
import axios from "axios"
import {Problem, Solution} from "@prisma/client";
const PROBLEMS_API_PATH = "/api/problems";
export const useProblems = ()=> {
    const [problemList, setProblemList] = React.useState<(Problem & {solutions:Solution[]})[]>()
    React.useEffect(() => {
        axios.get(PROBLEMS_API_PATH).then((res) => {
            setProblemList(res.data)
        })
    },[])
    return {
        problemList
    }
}