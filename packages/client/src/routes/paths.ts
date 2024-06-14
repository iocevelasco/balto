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
        root: 'adoption-process/pet',
        id: 'adoption-process/pet/:id'
      },
      adoptionForm: 'adoption-process/adoption-form',
      confirmation: 'adoption-process/confirmation',
    },
    all: '*',
  },
  private: {
    dashboard: 'dashboard',
    adoptionForm: 'dashboard/shelter-profile',
  }
}