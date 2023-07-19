import {Problem} from "@prisma/client";
import {
    Tr,
    Td,
    Button,
    HStack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
export const ProblemRow = (problem: Problem)=>{
    const router = useRouter()
    return <Tr>
        <Td width={"50%"}>{problem.name}</Td>
        <Td width={"15%"}>{problem.difficulty}</Td>
        <Td isNumeric width={"10%"}>{problem["solutions"].length}</Td>
        <Td width={"25%"}>
            <HStack>
                <Button onClick={()=>router.push(`/${problem.id}`)}>Try in Editor</Button>
            </HStack>
        </Td>
    </Tr>
}