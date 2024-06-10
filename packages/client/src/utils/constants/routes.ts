export const routes = {
  public: {
    home: '/',
    registration: {
      root: 'registration',
      termsAndConditions: 'registration/terms-and-conditions',
      shelterForm: 'signing-shelter-form',
      confirmation: 'confirmation',
    },
    adoptionProcess: {
      root: 'adoption-process',
      details: {
        root: 'pet',
        id: 'pet/:'
      },
      adoptionForm: 'adoption-form',
      confirmation: 'confirmation',
    },
    all: '*',
  },
  private: {
    dashboard: 'dashboard',
    adoptionForm: 'shelter-profile',
  }
}