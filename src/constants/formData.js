import searchValidator from '../components/validate/search';
import analyzeValidator from '../components/validate/analyze';

const formData = {
  search: {
    name: 'search',
    validate: searchValidator,
    initialValues: {
      keyword: '',
      negKeyword: '',
      platforms: [
        'mercari',
        'rakuma',
        'paypay',
        'yahoo-auction',
        'amazon',
        'rakuten',
        'yahoo-shopping',
      ],
      searchRange: 'title',
      minPrice: '',
      maxPrice: '',
      productStatus: ['all'],
      salesStatus: 'all',
      deliveryCost: 'all',
      sortOrder: 'asc',
      page: 1,
      type: 'initial',
      // category: [{ main: '', sub: '' }],
    },
  },
  analysis: {
    name: 'analyze',
    validate: analyzeValidator,
    initialValues: {
      keyword: '',
      negKeyword: '',
      platform: 'mercari',
      searchRange: 'title',
      minPrice: '',
      maxPrice: '',
      productStatus: ['all'],
      salesStatus: 'all',
      deliveryCost: 'all',
      sortOrder: 'asc',
      // category: [{ main: '', sub: '' }],
      // searchTarget: 'selling',
      // priceType: 'market',
    },
  },
};

export default formData;
