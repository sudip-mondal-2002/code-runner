"use client";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {useProblems} from "@/hooks/useProblems";
import {ProblemRow} from "@/components/composite/ProblemRow";
import {LoadingTable} from "@/components/base/LoadingTable";

export const ProblemList = () => {
    const {problemList} = useProblems()
    return <TableContainer style={{
        padding: "20px"
    }} >
        { problemList? <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>Problem Name</Th>
                    <Th>Difficulty</Th>
                    <Th isNumeric>Solutions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    problemList.map((problem) => <ProblemRow key={problem.id} {...problem}/>)
                }
            </Tbody>
        </Table>  : <LoadingTable/> }
    </TableContainer>
}