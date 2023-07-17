import { Skeleton, StackDivider, Stack } from '@chakra-ui/react'
export const LoadingTable = () => {
    return <Stack
        divider={<StackDivider borderColor='gray.200' />}
    >
        {
            Array.from({length: 10}).map((_, index)=><Skeleton key={index} height={"30px"}/>)
        }
    </Stack>
}