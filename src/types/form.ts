export interface SignUpFormData {
  province: string;
  club: string;
  firstName: string;
  lastName: string;
  gmsId: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  role: string;
  membershipType: string;
  consents: {
    termsAndPolicy: boolean;
    dataCollection: boolean;
    newsletter: boolean;
  };
}