"use client";

import Editor from "@uiw/react-textarea-code-editor";
import React, { use, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Language } from "@prisma/client";
import { useParams } from "next/navigation";
import { useSubmission } from "@/hooks/useSubmission";
import { ResultModal } from "@/components/composite/ResultModal";
import axios from "axios";

const SUPPORTED_LANGUAGES = Object.keys(Language).map((key) =>
  key.toLowerCase()
);

export const PlayGround = () => {
  const [code, setCode] = React.useState("");
  const [codeLanguage, setCodeLanguage] = React.useState<string>();
  const [input, setInput] = React.useState<string>("");
  const [output, setOutput] = React.useState<string>("");
  useEffect(() => {
    if (!code) return;
    localStorage.setItem("code", code);
  }, [code]);
  useEffect(() => {
    setCode(localStorage.getItem("code") || "");
  }, []);

  useEffect(() => {
    if (codeLanguage === "java") {
      if (
        !code.includes("public class Main") &&
        !code.includes(
          "main method should be part of a public class named Main"
        )
      ) {
        setCode(
          `/* The main method should be part of a public class named Main */`
        );
      }
    }
  }, [codeLanguage]);
  return (
    <HStack style={{ padding: "0 10px" }}>
      <Stack
        style={{
          width: "60%",
          height: "100vh",
        }}
      >
        <HStack>
          <Select onChange={(e) => setCodeLanguage(e.target.value)}>
            {SUPPORTED_LANGUAGES.map((language) => {
              return (
                <option key={language} value={language}>
                  {language}
                </option>
              );
            })}
          </Select>
          <Button
            backgroundColor={"blue.300"}
            color={"white"}
            onClick={async () => {
              const res = await axios.post("/api/run", {
                code: code,
                language: codeLanguage,
                input: input,
              });
              setOutput(res.data.output || res.data.error);
            }}
          >
            &#9654; Run
          </Button>
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
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
          }}
        />
      </Stack>
      <Stack style={{ width: "40%" }}>
        <Heading style={{ width: "100%" }}>Input:</Heading>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></Textarea>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
              if (!e.target) return;
              setInput(e.target.result as string);
            };
            reader.readAsText(file);
          }}
        />
        <Heading>Output:</Heading>
        <Box border="1px solid #ddd" borderRadius="5px" padding="10px 15px">
          {output}
        </Box>
      </Stack>
    </HStack>
  );
};
