import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Code, Link } from 'lucide-react';

type InsertOptionTypes = {
    onInsertCode: () => void;
    onInsertLink: () => void;
}

export default function InsertOptions({ onInsertCode, onInsertLink }: InsertOptionTypes) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Insert Options
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onInsertCode}>
          <Code className="mr-2" />
          Insert Code Snippet
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onInsertLink}>
          <Link className="mr-2" />
          Insert Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
