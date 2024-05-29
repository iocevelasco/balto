import AdoptionFormQuestion from './model';
import { AdoptionFormType } from '../../types/AdoptionForm';

export async function getAdoptionsForms() {
   try {
      let query = { active: true };
      let select = "id label inputType key";

      const data = await AdoptionFormQuestion.find(query)
         .select(select)
         .sort({ "label": 'asc' });

      return {
         status: 200,
         message: data
      };
   } catch (e) {
      console.log("[ERROR] -> getAdoptionsForms", e);
      return {
         status: 400,
         message: "Results error",
         detail: e,
      };
   };
};

export async function addAdoptionForm(data: AdoptionFormType) {
   try {
      const newItem = new AdoptionFormQuestion(data);
      const result = await newItem.save();
      return {
         status: 201,
         message: result
      };
   } catch (e) {
      console.log("[ERROR] -> addAdoptionForm", e);
      return {
         status: 400,
         message: "An error occurred while creating the shelter",
         detail: e,
      };
   };
};

export async function updateAdoptionForm(data: AdoptionFormType) {
   try {
      const foundForm = await AdoptionFormQuestion.findOne({ _id: data.id });
      if (!foundForm) throw new Error('Not adoption form found');
      await AdoptionFormQuestion.updateOne({ _id: data.id }, data);
      return {
         status: 200,
         message: "Adoption form updated successfully",
      };
   } catch (e) {
      console.log("[ERROR] -> updateAdoptionForm", e);
      return {
         status: 400,
         message: "An error occurred while creating the shelter",
         detail: e,
      };
   };
};

export async function deleteAdoptionForm(id: string) {
   try {
      const foundForm = await AdoptionFormQuestion.findOne({ _id: id });
      if (!foundForm) throw new Error('Not adoption form found');
      foundForm.active = false;
      foundForm.save();

      return { status: 200, message: "Adoption Form deleted" };
   } catch (e) {
      console.log("[ERROR] -> deleteAdoptionForm", e);
      return {
         status: 400,
         message: "An error occurred while deleting the Adoption Form",
         detail: e,
      };
   };
};