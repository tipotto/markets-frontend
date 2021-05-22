import searchValidate from '../components/validate/search';

const FormData = {
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
  },
};

export default FormData;
