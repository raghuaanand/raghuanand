"use client";

import { Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';
import tippy from 'tippy.js';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface CommandItemProps {
  title: string;
  description: string;
  icon: string;
}

interface CommandsMenuProps {
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
}

const CommandsList = forwardRef<any, CommandsMenuProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 max-h-60 overflow-y-auto">
      {props.items.map((item, index) => (
        <button
          key={index}
          className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 ${
            index === selectedIndex ? 'bg-gray-100' : ''
          }`}
          onClick={() => selectItem(index)}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{item.icon}</span>
            <div>
              <div className="font-medium text-gray-900">{item.title}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
});

CommandsList.displayName = 'CommandsList';

const SlashCommands = Extension.create({
  name: 'slashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command({ editor, range });
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const slashSuggestion = {
  items: ({ query }: { query: string }) => {
    const items = [
      {
        title: 'Heading 1',
        description: 'Big section heading',
        icon: '🏷️',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
        },
      },
      {
        title: 'Heading 2',
        description: 'Medium section heading',
        icon: '🏷️',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
        },
      },
      {
        title: 'Heading 3',
        description: 'Small section heading',
        icon: '🏷️',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
        },
      },
      {
        title: 'Bullet List',
        description: 'Create a simple bullet list',
        icon: '•',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        title: 'Numbered List',
        description: 'Create a numbered list',
        icon: '🔢',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        title: 'Task List',
        description: 'Create a task list with checkboxes',
        icon: '☑️',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
      },
      {
        title: 'Quote',
        description: 'Create a blockquote',
        icon: '💬',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
      {
        title: 'Code Block',
        description: 'Create a code block with syntax highlighting',
        icon: '💻',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
      {
        title: 'Table',
        description: 'Insert a table',
        icon: '📊',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        },
      },
      {
        title: 'Horizontal Rule',
        description: 'Insert a horizontal divider',
        icon: '➖',
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
      },
    ];

    return items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  },

  render: () => {
    let component: ReactRenderer;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(CommandsList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide();
          return true;
        }

        return (component.ref as { onKeyDown?: (props: any) => boolean })?.onKeyDown?.(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};

// Note: You'll need to install tippy.js for the popup
// npm install tippy.js

export default SlashCommands;
