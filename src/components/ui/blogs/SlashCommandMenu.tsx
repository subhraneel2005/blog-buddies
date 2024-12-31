import React, { useState, useEffect, useRef } from 'react';
import { Command } from "lucide-react";
import {
  Command as CommandPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

type CommandType = 'h1' | 'h2' | 'h3' | 'bullet' | 'number' | 'code' | 'quote' | 'image' | 'table';

interface Command {
  label: string;
  value: CommandType;
  icon: string;
}

interface SlashCommandMenuProps {
  onCommandSelect: (command: CommandType) => void;
  editor?: any;
}

const SlashCommandMenu: React.FC<SlashCommandMenuProps> = ({ onCommandSelect, editor }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    { label: 'Heading 1', value: 'h1', icon: 'H1' },
    { label: 'Heading 2', value: 'h2', icon: 'H2' },
    { label: 'Heading 3', value: 'h3', icon: 'H3' },
    { label: 'Bullet List', value: 'bullet', icon: '•' },
    { label: 'Numbered List', value: 'number', icon: '1.' },
    { label: 'Code Block', value: 'code', icon: '</>' },
    { label: 'Quote', value: 'quote', icon: '"' },
    { label: 'Image', value: 'image', icon: '🖼' },
    { label: 'Table', value: 'table', icon: '📊' }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !open) {
        e.preventDefault();
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX
          });
          setOpen(true);
        }
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleSelect = (value: CommandType) => {
    onCommandSelect(value);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          ref={menuRef}
          className="fixed z-50 w-64 bg-background border rounded-lg shadow-lg"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          <CommandPrimitive>
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {commands.map((command) => (
                  <CommandItem
                    key={command.value}
                    onSelect={() => handleSelect(command.value)}
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
                  >
                    <span className="w-6 text-center">{command.icon}</span>
                    <span>{command.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandPrimitive>
        </div>
      )}
    </>
  );
};

export default SlashCommandMenu;