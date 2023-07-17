import {Problem, TestCase} from "@prisma/client"
import {Button, Stack, Table, TableCaption, Tbody, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react"

const InputOutputExample = ({index, input, output}: {
    index: number,
    input: string,
    output: string,
}) => {
    return <Table>
        <TableCaption >Example #{index}</TableCaption>
        <Thead>
            <Tr>
                <Th>
                    Input
                </Th>
                <Th>
                    Output
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            <Tr>
                <Th>
                    {input}
                </Th>
                <Th>
                    {output}
                </Th>
            </Tr>
        </Tbody>
        <Tfoot>
            <Tr>
                <Th><Button onClick={()=>navigator.clipboard.writeText(input)}>Copy input to clipboard</Button></Th>
                <Th><Button onClick={()=>navigator.clipboard.writeText(output)}>Copy output to clipboard</Button></Th>
            </Tr>
        </Tfoot>
    </Table>
}

export const ProblemDescription = (problem: Problem) => {
    return <Stack style={{
        border: "1px solid #ccc",
        width: "50%",
        height: "90vh",
        overflowY: "scroll",
        padding: "20px 10px"
    }}>
        <Text fontSize={"26px"} fontWeight={"400"} >Problem Statement</Text>
        <Text>{problem.description}</Text>
        <Text fontSize={"26px"} fontWeight={"400"} style={{
            marginTop: "20px"
        }}>Example Test Cases</Text>
        {
            problem["testcases"].map((testcase: TestCase, index: number) => {
                return <InputOutputExample
                    key={testcase.id}
                    index={index}
                    input={testcase.input}
                    output={testcase.output}
                />
            })
        }
    </Stack>
}