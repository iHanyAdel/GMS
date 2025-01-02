import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { checkUniqueField } from './useUniqueValidation';
import { initialSignUpFormData } from '../constants/formDefaults';
import type { SignUpFormData } from '../types/form';

export function useSignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>(initialSignUpFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateField = async (field: string, value: string): Promise<boolean> => {
    if (!value) return true;

    let isValid = true;
    let errorMessage = '';

    switch (field) {
      case 'gms_id':
        if (value.length === 5) {
          const fullGmsId = `EGY-${value}`;
          isValid = await checkUniqueField('gms_id', fullGmsId);
          errorMessage = isValid ? '' : 'This GMS ID is already registered';
        }
        break;
      case 'national_id':
        if (value.length === 14) {
          isValid = await checkUniqueField('national_id', value);
          errorMessage = isValid ? '' : 'This National ID is already registered';
        }
        break;
    }

    setFieldErrors(prev => ({
      ...prev,
      [field]: errorMessage
    }));

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      // Validate consents
      if (!formData.consents.termsAndPolicy || !formData.consents.dataCollection) {
        throw new Error('Please accept the required terms and data collection consent');
      }

      // Validate matching fields
      if (formData.email !== formData.confirmEmail) {
        throw new Error('Emails do not match');
      }
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Check unique fields
      const [isGmsIdUnique, isNationalIdUnique] = await Promise.all([
        validateField('gms_id', formData.gmsId),
        validateField('national_id', formData.nationalId)
      ]);

      if (!isGmsIdUnique || !isNationalIdUnique) {
        throw new Error('Please fix the validation errors before continuing');
      }

      // Sign up with Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role,
            newsletter: formData.consents.newsletter
          }
        }
      });

      if (signUpError) throw signUpError;

      // Create profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: authData.user.id,
            full_name: `${formData.firstName} ${formData.lastName}`,
            role: formData.role,
            gms_id: `EGY-${formData.gmsId}`,
            national_id: formData.nationalId,
            club_id: formData.club,
            province_id: formData.province,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender,
            membership_type: formData.membershipType,
            newsletter: formData.consents.newsletter
          });

        if (profileError) throw profileError;
      }

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    error,
    fieldErrors,
    validateField,
    handleSubmit
  };
}