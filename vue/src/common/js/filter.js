import dictionary from './dictionary.json';

function searchWord(name) {
  return dictionary[name].options || [];
}

function toJSON(val) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)
}

function dateFmt(date, format) {
  if (!date) return '';
  date = new Date(date);
  const paddNum = function(num) {
      num += ''
      return num.replace(/^(\d)$/, '0$1')
    }
    // 指定格式字符
  const cfg = {
    yyyy: date.getFullYear(),
    yy: date.getFullYear().toString().substring(2),
    M: date.getMonth() + 1,
    MM: paddNum(date.getMonth() + 1),
    d: date.getDate(),
    dd: paddNum(date.getDate()),
    hh: paddNum(date.getHours()),
    mm: paddNum(date.getMinutes()),
    ss: paddNum(date.getSeconds())
  }
  format || (format = 'yyyy-MM-dd hh:mm:ss')
  return format.replace(/([a-z])(\1)*/ig, function(m) {
    return cfg[m]
  })
}

function currencyFmt(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  if (!s && s !== 0) {
    return '';
  }
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  var l = s.split('.')[0],
    r = s.split('.')[1];
  return '\u00a5' + ' ' + l + '.' + r;
}

function temperatureFmt(value) {
  return value + '℃'
}

function humidityFmt(value) {
  return value + '%RH'
}

// function ecFmt(value) {
//   return value + 'mS'
// }

function getValue(value, name) {
  const tmp = dictionary[name]
  if (tmp === undefined) {
    return ''
  }
  const map = tmp['options']
  let result = ''
  if (map !== undefined) {
    for (let i = 0; i < map.length; i++) {
      const tmp = map[i]
      if (tmp.value === value) {
        result = tmp.label
        break
      }
    }
    return result;
  } else {}
}

var output = {};
output.install = function(Vue) {
  Vue.prototype.$getWord = searchWord;
  Vue.prototype.$dateFilter = dateFmt;
  Vue.prototype.$toJSON = toJSON;

  Vue.filter('getValue', getValue);
  Vue.filter('dateFilter', dateFmt);
  Vue.filter('currency', currencyFmt);
  Vue.filter('temperature', temperatureFmt);
  Vue.filter('humidity', humidityFmt);
  Vue.filter('seeValue', function (value, arr) {
    if (!arr) return;
    let result = '';
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === value) {
        result = arr[i].label;
        break;
      }
    }
    return result;
  })
}

export default output;
