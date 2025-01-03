const entityMap: { [key: string]: string } = {};

const worldParameters = {
  // fixtures: {
  //   requestBody: resquestBodyFixture,
  // },
  setEntityMap(name: string, value: string) {
    entityMap[name] = value;
  },
  getEntityMap(name: string): string {
    return entityMap[name];
  },
};

export { worldParameters };
