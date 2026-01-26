"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Simplified Dropdown using Framer Motion since we don't have Radix Dropdown installed
// This provides a similar API to Radix but is self-contained.

interface DropdownMenuProps {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false)
    return (
        <div className="relative inline-block text-left">
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as any, { open, setOpen })
                }
                return child
            })}
        </div>
    )
}

export const DropdownMenuTrigger = ({ children, open, setOpen, asChild }: any) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!open);
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as any, {
            onClick: handleClick,
        });
    }

    return (
        <div onClick={handleClick} className="cursor-pointer">
            {children}
        </div>
    )
}

export const DropdownMenuContent = ({ children, open, setOpen, className, align = "end" }: any) => {
    React.useEffect(() => {
        if (!open) return;
        const clickHandler = () => setOpen(false);
        window.addEventListener("click", clickHandler);
        return () => window.removeEventListener("click", clickHandler);
    }, [open, setOpen]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className={cn(
                        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md mt-2",
                        align === "end" ? "right-0" : "left-0",
                        className
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export const DropdownMenuItem = ({ children, className, onClick }: any) => {
    return (
        <div
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export const DropdownMenuLabel = ({ children, className }: any) => (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
        {children}
    </div>
)

export const DropdownMenuSeparator = ({ className }: any) => (
    <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
)
