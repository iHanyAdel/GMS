import type { SignUpFormData } from '../types/form';

export const initialSignUpFormData: SignUpFormData = {
  province: '',
  club: '',
  firstName: '',
  lastName: '',
  gmsId: '',
  nationalId: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  role: '',
  membershipType: '',
  consents: {
    termsAndPolicy: false,
    dataCollection: false,
    newsletter: false
  }
};