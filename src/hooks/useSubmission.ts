import axios from "axios";

export function useSubmission(problemId: string){
    const SOLUTION_API_URL = `/api/problems/${problemId}/solve`
    const submitCode = async (code: string, language: string) => {
        await axios.post(SOLUTION_API_URL, {
            code,
            language: language.toUpperCase()
        })
    }
    return {submitCode}
}