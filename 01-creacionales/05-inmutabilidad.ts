/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState {
    readonly content: string;
    readonly cursorPosition: number;
    readonly unsavedChanges: boolean;

    constructor(content: string, cursorPosition: number, unsavedChanges: boolean) {
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsavedChanges = unsavedChanges;
    }

    public displayState(): void {
        console.log({
            content: this.content,
            cursorPosition: this.cursorPosition,
            unsavedChanges: this.unsavedChanges
        });
    }

    public copyWith({ content, cursorPosition, unsavedChanges }: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsavedChanges ?? this.unsavedChanges
        );
    }
}

class CodeEditorHistory {
    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;

    public save(state: CodeEditorState): void {
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.splice(0, this.currentIndex + 1);
        }
        this.history.push(state);
        this.currentIndex++;
    }

    public redo(): CodeEditorState | null {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }

        return null;
    }

    public undo(): CodeEditorState | null {
        if (this.currentIndex <= 0) {
            return null;
        }

        return this.history[--this.currentIndex];
    }
}

function main(): void {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState('a', 2, false);

    history.save(editorState);
    editorState.displayState();

    editorState = editorState.copyWith({
        content: 'b',
        cursorPosition: 5
    });
    history.save(editorState);
    editorState.displayState();

    editorState = history.undo()!;
    editorState.displayState();

    editorState = history.redo()!;
    editorState.displayState();
}

main();