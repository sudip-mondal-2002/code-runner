import {Box, Button, Skeleton, VStack, Text} from "@chakra-ui/react";
import {Output, Solution} from "@prisma/client";
import React from "react";
export const ResultModal = (
    {
        isLoading, solution, onClose
    }: {
        isLoading?: boolean,
        solution?: Solution,
        onClose: ()=>void
    }) => {
    const [failedOutput, setFailedOutput] = React.useState<Output>()
    React.useEffect(()=>{
        if(!solution) return
        setFailedOutput(solution["outputs"].find((output:Output)=>!output.passed))
    }, [solution])
    return <Box
        style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            backgroundColor: "#000a",
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <Box style={{
            height: "70%",
            width: "70%",
            backgroundColor: "#fff",
            minWidth: "300px",
            minHeight: "300px",
            maxWidth: "700px",
            maxHeight: "700px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {
                isLoading? <Skeleton height={"90%"} width={"90%"} />: <VStack style={{
                    height: "80%",
                    width: "80%"
                }}>
                {
                    failedOutput ? <>
                        <Text>Error:{failedOutput.error}</Text>
                        <Text>{failedOutput.errorMessage}</Text>
                    </> : <Text>Passed</Text>
                }
                    <Button onClick={onClose}>Close</Button>
                </VStack>
            }
        </Box>
    </Box>
}