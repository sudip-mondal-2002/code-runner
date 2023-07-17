import { Skeleton, Stack, HStack } from '@chakra-ui/react'

export const LoadingProblem = () => {
    return <Stack style={{
        padding: "20px"
    }}>
        <Skeleton height={"40px"} width={"100%"}/>
        <HStack>
            <Skeleton height={"600px"} width={"50%"}/>
            <Skeleton height={"600px"} width={"50%"}/>
        </HStack>
    </Stack>
}