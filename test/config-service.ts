const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'app.name':
        return 'any_name_app';
      case 'app.hosts.cooperativa':
        return 'https://cooperativas';
      case 'app.hosts.multicontas':
        return 'https://multicontas';
    }
  },
};

export default mockedConfigService;
