"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Input as ShadcnInput } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input = ({ label, error, className = "", ...props }: InputProps) => (
  <div className="space-y-1">
    {label && (
      <Label htmlFor={props.id || label} className="pl-0.5 text-xs font-bold uppercase tracking-wider text-gray-400">
        {label} {props.required && <span className="text-destructive">*</span>}
      </Label>
    )}
    <ShadcnInput
      id={props.id || label}
      className={cn(
        "h-10 rounded-lg",
        error && "border-destructive focus-visible:ring-destructive/20",
        className
      )}
      {...props}
    />
    {error && <p className="text-destructive text-[11px] font-semibold pl-0.5">{error}</p>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  className?: string;
  placeholder?: string;
}

export const Select = ({ label, error, options, className = "", value, onChange, ...props }: SelectProps) => (
  <div className="space-y-1">
    {label && (
      <Label className="pl-0.5 text-xs font-bold uppercase tracking-wider text-gray-400">
        {label} {props.required && <span className="text-destructive">*</span>}
      </Label>
    )}
    <ShadcnSelect 
      value={value as string} 
      onValueChange={(val) => {
        if (onChange) {
          const event = {
            target: { value: val, name: props.name },
          } as any;
          onChange(event);
        }
      }}
    >
      <SelectTrigger 
        className={cn(
          "w-full h-10 rounded-lg",
          error && "border-destructive focus:ring-destructive/10",
          className
        )}
      >
        <SelectValue placeholder={props.placeholder || "Select Option"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
    {error && <p className="text-destructive text-[11px] font-semibold pl-0.5">{error}</p>}
  </div>
);
