import { basicSetup, EditorState, EditorView } from '@codemirror/basic-setup';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { theme } from './theme';
import { indentWithTab } from '@codemirror/commands';
import { keymap } from '@codemirror/view';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { StreamLanguage } from '@codemirror/stream-parser';
import { basicSetup as ixoraBasicSetup, frontmatter } from '../src';

const editor = new EditorView({
    state: EditorState.create({
        extensions: [
            keymap.of([indentWithTab]),
            markdown({
                base: markdownLanguage,
                extensions: [frontmatter],
            }),
            StreamLanguage.define(yaml),
            EditorView.lineWrapping,
            theme,

            basicSetup,
            ixoraBasicSetup,
        ],
    }),
    parent: document.body,
});

editor.focus();
