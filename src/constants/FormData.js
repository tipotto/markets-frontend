import searchValidate from '../components/validate/search';

const FormData = {
  search: {
    name: 'Search',
    validate: searchValidate,
    initialValues: {
      page: 1,
      category: [{ main: '', sub: '' }],
      keyword: '',
      platforms: ['mercari', 'rakuma', 'paypay'],
      minPrice: '',
      maxPrice: '',
      productStatus: ['all'],
      salesStatus: 'all',
      deliveryCost: 'all',
      sortOrder: 'asc',
      keywordFilter: 'use',
    },
  },
  analysis: {
    name: 'Analysis',
    validate: searchValidate,
    initialValues: {
      page: 1,
      searchType: 'market',
      keyword: '',
      platforms: ['mercari', 'rakuma', 'paypay'],
      // minPrice: '',
      // maxPrice: '',
      productStatus: ['all'],
      // salesStatus: 'all',
      deliveryCost: 'all',
      // sortOrder: 'asc',
      keywordFilter: 'use',
    },
  },
};

export default FormData;
