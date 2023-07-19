import axios from "axios";
import React from "react";
import {ResultModal} from "@/components/composite/ResultModal";
import {Solution} from "@prisma/client";

export function useSubmission(problemId: string){
    const SOLUTION_API_URL = `/api/problems/${problemId}/solve`
    const [submissionModal, setSubmissionModal] = React.useState<React.ReactElement>()
    const handleModalClose = ()=>{
        setSubmissionModal(undefined)
    }
    const submitCode = async (code: string, language: string) => {
        setSubmissionModal(<ResultModal isLoading={true} onClose={handleModalClose} /> )
        const result = await axios.post(SOLUTION_API_URL, {
            code,
            language: language.toUpperCase()
        })
        setSubmissionModal(<ResultModal solution={result.data as Solution} onClose={handleModalClose}/> )
    }
    return {submitCode, submissionModal}
}