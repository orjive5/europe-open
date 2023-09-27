import countryList from 'country-list'

// Country list
export const countries = countryList.getData();
// Overwrite Türkiye to Turkey
countryList.overwrite([{
  code: 'TR',
  name: 'Turkey',
}]);