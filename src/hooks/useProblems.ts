import React from "react";
import axios from "axios"
import {Problem} from "@prisma/client";
const PROBLEMS_API_PATH = "/api/problems";
export const useProblems = ()=> {
    const [problemList, setProblemList] = React.useState<Problem[]>()
    React.useEffect(() => {
        axios.get(PROBLEMS_API_PATH).then((res) => {
            setProblemList(res.data)
        })
    },[])
    return {
        problemList
    }
}