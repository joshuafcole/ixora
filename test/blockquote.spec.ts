import { EditorView } from '@codemirror/view';
import { expect } from '@open-wc/testing';
import { setup } from './setup-editor';

let editor!: EditorView;
const content = `> Hello
> > Hi!
`;

beforeEach(() => {
    const editorEl = document.createElement('div');
    editorEl.id = 'editor';
    document.body.appendChild(editorEl);
    editor = setup(editorEl);
    const tn = editor.state.update({
        changes: {
            from: 0,
            insert: content
        }
    });
    editor.dispatch(tn);
});
afterEach(() => {
    document.body.removeChild(document.getElementById('editor'));
});

describe('Blockquote plugin', () => {
    it('Should render a solid bar' + ' when cursor is not on the line', () => {
        const tn = editor.state.update({
            selection: {
                anchor: editor.viewportLineBlocks[2].from
            }
        });
        editor.dispatch(tn);

        const firstLine = editor.domAtPos(editor.viewportLineBlocks[0].from)
            .node as HTMLElement;
        const secondLine = editor.domAtPos(editor.viewportLineBlocks[1].from)
            .node as HTMLElement;

        expect(firstLine).to.have.trimmed.text('Hello');
        expect(secondLine).to.have.trimmed.text('Hi!');
    });
});