import searchValidator from '../components/validate/search';
import analyzeValidator from '../components/validate/analyze';

const formData = {
  search: {
    name: 'Search',
    validate: searchValidator,
    initialValues: {
      type: 'initial',
      page: 1,
      category: [{ main: '', sub: '' }],
      keyword: '',
      negKeyword: '',
      platforms: ['mercari', 'rakuma', 'paypay'],
      searchRange: 'title',
      minPrice: '',
      maxPrice: '',
      productStatus: ['all'],
      salesStatus: 'all',
      deliveryCost: 'all',
      sortOrder: 'asc',
    },
  },
  analysis: {
    name: 'Analysis',
    validate: analyzeValidator,
    initialValues: {
      keyword: '',
      negKeyword: '',
      platform: 'mercari',
      searchTarget: 'selling',
      priceType: 'market',
      searchRange: 'title',
      productStatus: ['all'],
      deliveryCost: 'all',
      sortOrder: 'asc',
    },
  },
};

export default formData;
