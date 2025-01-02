import React from 'react';
import { Pencil, FileText, Award, History, Trophy, Mail, Lock } from 'lucide-react';

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
}

export function ProfileActions() {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <ActionButton icon={Pencil} label="Edit Profile" onClick={() => {}} />
      <ActionButton icon={FileText} label="Documents" onClick={() => {}} />
      <ActionButton icon={Award} label="Belt History" onClick={() => {}} />
      <ActionButton icon={History} label="Historical" onClick={() => {}} />
      <ActionButton icon={Trophy} label="Results" onClick={() => {}} />
      <ActionButton icon={Mail} label="Send Reset Password Link" onClick={() => {}} />
      <ActionButton icon={Lock} label="Reset Password" onClick={() => {}} />
    </div>
  );
}