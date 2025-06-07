export type SpecificationGroup = {
  specification_group_id: string;
  specification_group_name: string;
};

export type ApiGetSpecificationGroupsResponse = {
  specification_groups: SpecificationGroup[];
};

export type ApiPostSpecificationGroupsRequest = {
  specification_group_name: string;
};

export type ApiPostSpecificationGroupsResponse = {
  specification_group_id: string;
};

export type ApiGetSpecificationGroupsSpecificationGroupIdResponse = {
  specification_group_id: string;
  specification_group_name: string;
};

export type ApiPutSpecificationGroupsSpecificationGroupIdRequest = {
  specification_group_name: string;
};

export type ApiPutSpecificationGroupsSpecificationGroupIdResponse = {
  specification_group_id: string;
};

export type ApiDeleteSpecificationGroupsSpecificationGroupIdRequest = {
  specification_group_id: string;
};

export type ApiDeleteSpecificationGroupsSpecificationGroupIdResponse = {
  specification_group_id: string;
};