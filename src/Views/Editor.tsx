import { useEffect, useState, type FC } from "react"
import Editor from '@monaco-editor/react';
import { httpClient } from "@/helpers/httpClient";
import { Button } from "@mui/material";

const BASE_URL = import.meta.env.MATH_NOTES_BASE_URL;

export const CustomEditor: FC = () => {
    const [code, setCode] = useState<string>('')


    function handleEditorChange(value: string | undefined) {
        if (!value) return;
        console.log(value)
        setCode(value);
    }

    useEffect(() => {
        httpClient(`${BASE_URL}/admin/instance-settings`, {
            method: 'GET',
        }).then(async res => {
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || 'Registration failed');
            }
            setCode(data.instance_settings);
        });
    }, [])


    const handleSave = () => {
        httpClient(`${BASE_URL}/admin/instance-settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instance_settings: code
            })
        })
    }


    return (
        <>
            <Editor height="90vh" defaultLanguage="yaml" value={code} onChange={handleEditorChange} theme="vs-dark" />
            <Button variant="outlined" onClick={handleSave}>SAVE</Button>
        </>
    )
}