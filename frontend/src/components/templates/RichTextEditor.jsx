import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({
  content,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],

    content,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <EditorContent editor={editor} />
  );
};

export default RichTextEditor;