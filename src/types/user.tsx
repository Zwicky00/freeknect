export interface userDataType {
  _id: string;
  email: string;
  name: string;
  picture: string;
}

export interface communityDataType {
  _id: string,
  name: string,
  memberList: {
    member: string,
    role: string,
  }[]
}
