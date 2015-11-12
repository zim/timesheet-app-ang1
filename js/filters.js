angular.module('jobFilters1', []).filter('checkmark', function() {

  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
  
});

angular.module('jobFilters2', []).filter('dateFormat1', function($filter)
{
    
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
 
  return _date.toUpperCase();

 };
    
});

//
angular.module('jobFilters3', []).filter('startsWithA', function () {
    
    console.log('startsWithA');
    
  return function (items) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
        
      //console.log(item.date);
        
      if (/t/i.test(item.client.substring(0, 1))) {
          
        filtered.push(item);
      }
    }
    return filtered;
  };
    
});

angular.module('jobFilters4', []).filter('groupByMonthYear', function($parse) {
    var dividers = {};

    return function(input) {
        if (!input || !input.length) return;

        var output = [], 
            previousDate, 
            currentDate;

        for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
            currentDate = moment(item.date);
            if (!previousDate ||
                currentDate.month() != previousDate.month() ||
                currentDate.year() != previousDate.year()) {

                var dividerId = currentDate.format('MMYYYY');

                if (!dividers[dividerId]) {
                    dividers[dividerId] = {
                        isDivider: true,
                        divider: currentDate.format('MMMM YYYY') 
                    };
                }

                output.push(dividers[dividerId]);               
            }

            output.push(item);
            previousDate = currentDate;
        }

        return output;
    };
})