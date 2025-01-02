import React from 'react';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import type { Role, MembershipType } from '../types/auth';

const GENDER_OPTIONS = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' }
];

const ROLE_OPTIONS = [
  { id: 'athlete', name: 'Athlete' },
  { id: 'coach', name: 'Coach' }
];

interface SignUpFormFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
  availableMembershipTypes: string[];
}

export function SignUpFormFields({ formData, setFormData, availableMembershipTypes }: SignUpFormFieldsProps) {
  const membershipOptions = availableMembershipTypes.map(type => ({
    id: type,
    name: type.charAt(0).toUpperCase() + type.slice(1)
  }));

  return (
    <>
      <InputField
        label="Date of Birth"
        id="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={(value) => setFormData({ ...formData, dateOfBirth: value })}
        required
      />

      <SelectField
        label="Gender"
        id="gender"
        value={formData.gender}
        onChange={(value) => setFormData({ ...formData, gender: value })}
        options={GENDER_OPTIONS}
        required
      />

      <InputField
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        required
      />

      <InputField
        label="Confirm Email"
        id="confirmEmail"
        type="email"
        value={formData.confirmEmail}
        onChange={(value) => setFormData({ ...formData, confirmEmail: value })}
        required
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        required
      />

      <InputField
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
        required
      />

      <SelectField
        label="Primary Membership Role"
        id="role"
        value={formData.role}
        onChange={(value) => setFormData({ ...formData, role: value })}
        options={ROLE_OPTIONS}
        required
      />

      {formData.role === 'athlete' && membershipOptions.length > 0 && (
        <SelectField
          label="Select Membership"
          id="membershipType"
          value={formData.membershipType}
          onChange={(value) => setFormData({ ...formData, membershipType: value })}
          options={membershipOptions}
          required
        />
      )}
    </>
  );
}