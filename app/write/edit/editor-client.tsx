"use client";

import NotionEditor from "@/components/notion-editor";

export default function EditorClient({ editId }: { editId: string }) {
  return <NotionEditor editId={editId} />;
}
