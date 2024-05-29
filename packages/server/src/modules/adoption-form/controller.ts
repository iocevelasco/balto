import {
   addAdoptionForm,
   deleteAdoptionForm as _deleteAdoptionForm,
   getAdoptionsForms,
   updateAdoptionForm as _updateAdoptionForm
} from './store';
import { AdoptionFormType } from '../../types/AdoptionForm'

export async function getAllAdoptionsForm() {
   try {
      const result = await getAdoptionsForms();
      if (!result) throw new Error('Not Adoption Form found')
      return {
         status: 200,
         message: result
      };
   } catch (e) {
      console.log(e);
      return {
         status: 500,
         message: "Unexpected controller error",
         detail: e,
      };
   };
};

export async function addNewAdoptionForm(data: AdoptionFormType) {
   try {
      const result = await addAdoptionForm(data);
      return {
         status: 200,
         message: result
      };
   } catch (e) {
      console.log(e);
      return {
         status: 500,
         message: "Unexpected controller error",
         detail: e,
      };
   };
};

export async function updateAdoptionForm(data: AdoptionFormType) {
   try {
      if (!data.id) {
         return {
            status: 400,
            message: 'No Adoption form received',
            detail: ''
         };
      };
      const result = await _updateAdoptionForm(data);
      return {
         status: 200,
         message: result
      };
   } catch (e) {
      console.log(e);
      return {
         status: 500,
         message: "Unexpected controller error",
         detail: e,
      };
   };
};

export async function deleteAdoptionForm(id: string) {
   try {
      const result = await _deleteAdoptionForm(id);
      return {
         status: 200,
         message: result
      };
   } catch (e) {
      console.log(e);
      return {
         status: 500,
         message: "Unexpected controller error",
         detail: e,
      };
   }
}