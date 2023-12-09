import { useEffect, useState } from 'react'
import {
    BtnBold,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    BtnBulletList,
    Editor,
    EditorProvider,
    Separator,
    Toolbar,
} from 'react-simple-wysiwyg'

export function useTextAreaEditor(initalText: any, disabled: any) {
    const [editorText, setEditorText] = useState()

    useEffect(() => {
        if (initalText) {
            setEditorText(initalText)
        }
    }, [initalText])

    return {
        editorText,
        editorComponent: (
            <EditorProvider>
                <Editor
                    value={editorText}
                    onChange={(e: any) => setEditorText(e.target.value)}
                    containerProps={{ style: { minHeight: '300px' } }}
                    disabled={disabled}
                >
                    <Toolbar>
                        <BtnUndo />
                        <BtnRedo />
                        <Separator />
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                        <BtnClearFormatting />
                        <BtnStyles />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        ),
        setEditorText,
    }
}
