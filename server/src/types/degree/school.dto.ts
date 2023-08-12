export interface CreateSchoolDto {
  name: string,
  code: string
}

export interface UpdateSchoolDto {
  name?: string;
  code?: string;
  isActive?: boolean;
}
