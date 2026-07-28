import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface CollapsibleToolProps {
  title: string;
  icon?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleTool: React.FC<CollapsibleToolProps> = ({
  title,
  description,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-ink ${isOpen ? 'bg-sheet' : 'bg-transparent'}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 p-4 text-left transition-colors duration-150 hover:bg-band sm:p-5"
      >
        <span>
          <span className="block font-display text-[1.0625rem] font-bold leading-tight">{title}</span>
          {description && (
            <span className="mt-1 block text-[0.875rem] leading-snug text-steel">{description}</span>
          )}
        </span>
        <span className="mt-0.5 shrink-0 text-steel" aria-hidden="true">
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>

      {/* grid-rows 0fr → 1fr animates to the content's real height, whatever it is. */}
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-rule p-4 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleTool;
