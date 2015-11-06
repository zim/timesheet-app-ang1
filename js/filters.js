angular.module('jobFilters', []).filter('checkmark', function() {

  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
  
});

angular.module('jobFilters', []).filter('dateFormat1', function($filter)
{
    
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
 
  return _date.toUpperCase();

 };
    
});