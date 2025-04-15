import { ApiGetSpecificationGroups } from "@/lib/api"
import { ApiGetSpecificationGroupsResponse, SpecificationGroup } from "@/lib/type";

export const GetSpecificationGroupsInteractor = async () => {
  const response = await ApiGetSpecificationGroups();
  return response.map(elem => mapSpecificationGroups(elem));
}

const mapSpecificationGroups = (specificationGroups: ApiGetSpecificationGroupsResponse): SpecificationGroup => {
  return {
    specificationGroupId: specificationGroups.specification_group_id,
    specificationGroupName: specificationGroups.specification_group_name,
  }
}