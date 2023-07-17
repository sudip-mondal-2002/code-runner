"use client"
import { useParams } from 'next/navigation';
import {useProblemDetails} from "@/hooks/useProblemDetails";
import {LoadingProblem} from "@/components/base/LoadingProblem";
import {Stack, Box, HStack} from "@chakra-ui/react"
import {ProblemDescription} from "@/components/composite/ProblemDescription";
import {CodeEditor} from "@/components/composite/CodeEditor";

export const ProblemContainer = () => {
    const {problemId} = useParams()
    const {problem} = useProblemDetails(problemId)
    return <>
        {problem ? <Stack padding={"20px"}>
            <Box style={{
                width: "100%",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                boxShadow: "0 0 10px #ccc",
            }}>
                {problem.name}
            </Box>
            <HStack>
                <ProblemDescription {...problem} />
                <CodeEditor />
            </HStack>
        </Stack>:<LoadingProblem/> }
    </>
}