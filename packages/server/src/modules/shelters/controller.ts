import {
  getShelter as _getShelter,
  getPaginateShelters,
  getSimpleShelters,
  addShelter as _addShelter,
  updateShelter as _updateShelter,
  deleteShelter as _deleteShelter
} from "./store";
import { ShelterType } from "../../types/Shelters";

export async function getShelters(filter: string, page: number, simple: boolean) {
  try {
    if (!page || page < 1) {
      page = 1;
    }
    if (filter === '' || filter === undefined || !filter) {
      filter = '';
    }
    let newArray: { id: string | undefined; name: string; }[] = [];
    let result: any = null;
    if (simple) {
      result = await getSimpleShelters();
      if (!result) throw new Error('Undefined error');
      result.message.map((item: ShelterType) => {
        newArray.push({
          id: item._id,
          name: item.name
        })
      });
    } else {
      result = await getPaginateShelters(filter, page);
    }
    return {
      status: result.status,
      message: simple ? newArray : result.message
    };
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected error",
      detail: e,
    };
  }
}

export async function getShelter(id: string) {
  try {
    if (!id) {
      return {
        status: 400,
        message: "Shelter ID is required",
      };
    }
    const result = await _getShelter(id);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function addShelter(data: ShelterType) {
  try {
    const result = await _addShelter(data);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function updateShelter(data: ShelterType) {
  try {
    if (!data.id) {
      return {
        status: 400,
        message: "No Shelter ID received",
        detail: ''
      };
    }
    const result = await _updateShelter(data);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}

export async function deleteShelter(id: string) {
  try {
    const result = await _deleteShelter(id);
    return result;
  } catch (e) {
    console.log(e);
    return {
      status: 500,
      message: "Unexpected controller error",
      detail: e,
    };
  }
}