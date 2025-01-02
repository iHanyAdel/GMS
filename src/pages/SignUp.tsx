import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
import { PrefixedInputField } from '../components/PrefixedInputField';
import { SelectField } from '../components/SelectField';
import { SignUpFormFields } from '../components/SignUpFormFields';
import { ConsentCheckboxes } from '../components/ConsentCheckboxes';
import { provinces } from '../data/provinces';
import { clubs } from '../data/clubs';
import { getAvailableMembershipTypes } from '../utils/membershipRules';
import { validateNameInput } from '../utils/validations';
import { validateGmsId, validateNationalId, formatNationalId } from '../utils/idValidations';
import { useSignUpForm } from '../hooks/useSignUpForm';

export default function SignUp() {
  const { 
    formData, 
    setFormData, 
    loading, 
    error, 
    fieldErrors,
    validateField, 
    handleSubmit 
  } = useSignUpForm();

  const availableClubs = clubs.filter(club => club.provinceId === formData.province);
  const availableMembershipTypes = getAvailableMembershipTypes(formData.dateOfBirth, formData.role);

  const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
    if (validateNameInput(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleGmsIdChange = async (value: string) => {
    setFormData({ ...formData, gmsId: value });
    if (value.length === 5) {
      await validateField('gms_id', value);
    }
  };

  const handleNationalIdChange = async (value: string) => {
    setFormData({ ...formData, nationalId: value });
    if (value.length === 14) {
      await validateField('national_id', value);
    }
  };

  return (
    <Layout title="Register">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <SelectField
          label="Province"
          id="province"
          value={formData.province}
          onChange={(value) => setFormData({ ...formData, province: value, club: '' })}
          options={provinces}
          required
        />

        {formData.province && (
          <SelectField
            label="Club"
            id="club"
            value={formData.club}
            onChange={(value) => setFormData({ ...formData, club: value })}
            options={availableClubs}
            required
          />
        )}

        <InputField
          label="First Name"
          id="firstName"
          value={formData.firstName}
          onChange={(value) => handleNameChange('firstName', value)}
          maxLength={15}
          placeholder="Ex: Ahmed"
          pattern="[A-Za-z\s]+"
          required
        />

        <InputField
          label="Last Name"
          id="lastName"
          value={formData.lastName}
          onChange={(value) => handleNameChange('lastName', value)}
          maxLength={34}
          placeholder="Ex: Mohamed Mahmoud Ali"
          pattern="[A-Za-z\s]+"
          required
        />

        <div className="space-y-1">
          <PrefixedInputField
            label="GMS ID"
            id="gmsId"
            prefix="EGY-"
            value={formData.gmsId}
            onChange={handleGmsIdChange}
            maxLength={5}
            validate={validateGmsId}
            required
          />
          {fieldErrors.gms_id && (
            <p className="text-sm text-red-500">{fieldErrors.gms_id}</p>
          )}
        </div>

        <div className="space-y-1">
          <InputField
            label="National ID"
            id="nationalId"
            value={formData.nationalId}
            onChange={handleNationalIdChange}
            maxLength={14}
            minLength={14}
            validate={validateNationalId}
            format={formatNationalId}
            pattern="^[23]\d{13}$"
            required
          />
          {fieldErrors.national_id && (
            <p className="text-sm text-red-500">{fieldErrors.national_id}</p>
          )}
        </div>

        <SignUpFormFields
          formData={formData}
          setFormData={setFormData}
          availableMembershipTypes={availableMembershipTypes}
        />

        <ConsentCheckboxes
          consents={formData.consents}
          onChange={(key, value) => 
            setFormData({
              ...formData,
              consents: { ...formData.consents, [key]: value }
            })
          }
        />

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-blue-500 hover:text-blue-400">
            Back to Login
          </Link>
        </div>
      </form>
    </Layout>
  );
}