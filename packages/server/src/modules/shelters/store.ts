import Shelters from "./model";
import { ShelterType } from "../../types/Shelters";

export async function getShelter(id: string) {
  try {
    let query = { active: true, _id: id };

    const result = await Shelters.findOne(query);
    return {
      status: 200,
      message: result,
    };
  } catch (e) {
    console.log("[ERROR] -> getShelter", e);
    return {
      status: 400,
      message: "Results error",
      detail: e,
    };
  }
}

export async function getSimpleShelters() {
  try {
    let query = { active: true };
    let select = "id name";

    const result = await Shelters.find(query)
      .select(select)
      .sort({ "name": 'asc' });

    return {
      status: 200,
      message: result
    };
  } catch (e) {
    console.log("[ERROR] -> getSimpleShelters", e);
    return {
      status: 400,
      message: "Results error",
      detail: e,
    };
  }
}

export async function getPaginateShelters(filter: string, page: number) {
  try {
    const limit = 20;
    let query: any = { active: true };
    let select = "";
    if (filter) {
      query.name = { "$regex": filter, "$options": "i" }
    }
    select = "id name description image information";

    const result = await Shelters.find(query)
      .select(select)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({
        "createdat": 'desc'
      });
    const totalShelters = await Shelters.countDocuments(query);
    const totalPages = Math.ceil(totalShelters / limit);
    const next = () => {
      if (totalPages > page) {
        return page + 1;
      } else {
        return null;
      }
    }

    return {
      status: 200,
      message: {
        results: result,
        totalShelters,
        totalPages,
        currentPage: page,
        next: next(),
      }
    };
  } catch (e) {
    console.log("[ERROR] -> getPaginateStudyPlans", e);
    return {
      status: 400,
      message: "Results error",
      detail: e,
    };
  }
}

export async function addShelter(data: ShelterType) {
  try {

    const newItem = new Shelters(data);
    const result = await newItem.save();
    return {
      status: 201,
      message: result,
    };
  } catch (e) {
    console.log("[ERROR] -> addShelter", e);
    return {
      status: 400,
      message: "An error occurred while creating the shelter",
      detail: e,
    };
  }
}

export async function updateShelter(data: ShelterType) {
  try {
    const foundShelter = await Shelters.findOne({ _id: data.id });
    if (!foundShelter) throw new Error('Not shelter found');
    await Shelters.updateOne({ _id: data.id }, data);
    return {
      status: 200,
      message: "Shelter updated successfully",
    };
  } catch (e) {
    console.log("[ERROR] -> Shelter", e);
    return {
      status: 400,
      message: "An error occurred while updating the Shelter",
      detail: e,
    };
  }
}

export async function deleteShelter(id: string) {
  try {
    const foundShelter = await Shelters.findOne({ _id: id });
    if (!foundShelter) throw new Error('Not shelter found');
    foundShelter.active = false;
    foundShelter.save();

    return { status: 200, message: "Shelter deleted" };
  } catch (e) {
    console.log("[ERROR] -> deleteShelter", e);
    return {
      status: 400,
      message: "An error occurred while deleting the Shelter",
      detail: e,
    };
  }
}
