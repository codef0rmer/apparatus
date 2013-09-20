'use strict';

FiltersModule.filter('timespan', function() {
  return function(timespan, humanReadable) {
    var time;

    if (humanReadable) {
      switch (timespan) {
        case 30:
          time = '30 Minutes';
          break;
        case 60:
          time = '1 Hour';
          break;
        case 120:
          time = '2 Hours';
          break;
        case 180:
          time = '3 Hours';
          break;
        case 240:
          time = '4 Hours';
          break;
        case 480:
          time = 'Whole Day';
          break;
        case 960:
          time = '2 Days';
          break;
        case 999999999999:
          time = 'Forever';
          break;
        default:
          time = '30 Minutes';
          break;
      }
    } else {
      switch (timespan) {
        case '30 Minutes':
          time = 30;
          break;
        case '1 Hour':
          time = 60;
          break;
        case '2 Hours':
          time = 120;
          break;
        case '3 Hours':
          time = 180;
          break;
        case '4 Hours':
          time = 240;
          break;
        case 'Whole Day':
          time = 480;
          break;
        case '2 Days':
          time = 960;
          break;
        case 'Forever':
          time = 999999999999;
          break;
        default:
          time = 30;
          break;
      }
    }

    return time;
  }
});