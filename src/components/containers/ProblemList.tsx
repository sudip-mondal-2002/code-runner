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
    Heading,
    Button
} from '@chakra-ui/react'
import {useProblems} from "@/hooks/useProblems";
import {ProblemRow} from "@/components/composite/ProblemRow";
import {LoadingTable} from "@/components/base/LoadingTable";
import { color } from 'framer-motion';
import Link from 'next/link';

export const ProblemList = () => {
    const {problemList} = useProblems()
    return <>
    <Heading style={{padding:"20px",backgroundColor:"black", color:"yellow"}}>
        Code Jet
        <Link href={"/playground"}> <Button style={{backgroundColor:"greenyellow", margin:"10px"}}>PlayGround</Button></Link>
    </Heading>
    <TableContainer style={{
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
    </>
}