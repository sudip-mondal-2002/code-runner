import Editor from '@uiw/react-textarea-code-editor';
import React from "react";
import {Button, HStack, Select, Stack} from "@chakra-ui/react";
import {Language} from "@prisma/client";
import {useParams} from "next/navigation";
import {useSubmission} from "@/hooks/useSubmission";
import {ResultModal} from "@/components/composite/ResultModal";

const SUPPORTED_LANGUAGES = Object.keys(Language).map((key) => key.toLowerCase());

export const CodeEditor = () => {
    const {problemId} = useParams()
    const [code, setCode] = React.useState("");
    const [codeLanguage, setCodeLanguage] = React.useState<string>(SUPPORTED_LANGUAGES[0]);
    const {submitCode, submissionModal} = useSubmission(problemId)
    return (<Stack style={{
            width: "50%",
        }}>
            <HStack>
                <Select onChange={(e) => setCodeLanguage(e.target.value)}>
                    {
                        SUPPORTED_LANGUAGES.map((language) => {
                            return <option key={language} value={language}>{language}</option>
                        })
                    }
                </Select>
                <Button backgroundColor={"green.300"} color={"white"} onClick={async ()=>{
                    await submitCode(code, codeLanguage)
                }}>Submit</Button>
            </HStack>
            <Editor
                value={code}
                language={codeLanguage}
                placeholder="Write your code here"
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    width: "100%",
                    height: "80vh",
                    overflowY: "scroll"
                }}
            />
            {submissionModal}
        </Stack>
    );
}