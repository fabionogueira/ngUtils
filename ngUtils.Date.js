/**
 * ngUtils.Date.js
 */
(function(){
    var DATETIME_FORMATS;
    
    /**
     * y   = ano 4 dígitos
     * yy  = ano 2 dígitos
     * MM  = mês 2 dígitos
     * MMM = mês 3 caracteres por extenso
     * MMMM= mês completo por extenso
     * d   = dia
     * dd  = dia 2 dígitos
     * HH  = hora 2 dígitos
     * mm  = minutos 2 dígitos
     * ss  = segundos 2 dígitos
     * EEE = dia da semana
     *
     * @example
     *      Date.localeJSON({});
     *      var d = new Date();
     *      d.format('locale');  //data no formato da máscara definida em locale, ex: {DATE:'y-mm-dd'}
     *      d.format('y');    //2016
     *      d.format('y-MMM') //2016-jan
     * 
     *      //criando uma nova máscara
     *      Date.setMask('anoAnterior', function(dt){
     *          return dt.getFullYear()-1;
     *      });
     *      d.format('anoAnterior-mm'); //2015-01
     */
    var DateMasks = {};
    Date.prototype.format = function(mask){
        var i, f, j='', r='', s='/', a = mask.split(s);

        if (a.length===1){
            s = '-';
            a = mask.split(s);
        }

        for (i=0; i<a.length; i++){
            f = DateMasks[a[i]];
            if (f){
                r += j + f(this, DateMasks);
                j = s; 
            }
        }

        return r;
    };
    Date.locale = function(json){
        DATETIME_FORMATS = json.DATETIME_FORMATS;
    };
    Date.setMask = function(mask, fn){
        DateMasks[mask] = fn;
    };
    Date.setMask('locale', function(dt){
        if (DATETIME_FORMATS){
            return dt.format(DATETIME_FORMATS.shortDate);
        }
        return dt.toLocaleString();
    });
    Date.setMask('y', function(dt){
        return dt.getFullYear();
    });
    Date.setMask('yy', function(dt){
        return String(dt.getFullYear()).substr(2);
    });
    Date.setMask('M', function(dt){
        return dt.getMonth()+1;
    });
    Date.setMask('MM', function(dt){
        var m = dt.getMonth()+1;
        return (m<10 ? '0' : '') + m;
    });
    Date.setMask('MMM', function(dt, Masks){
        if (DATETIME_FORMATS){
            return DATETIME_FORMATS.SHORTMONTH[dt.getMonth()];
        }
        return Masks.mm(dt);
    });
    Date.setMask('MMMM', function(dt, Masks){
        if (DATETIME_FORMATS){
            return DATETIME_FORMATS.MONTH[dt.getMonth()];
        }
        return Masks.mm(dt);
    });
    Date.setMask('d', function(dt){
        return dt.getDate();
    });
    Date.setMask('dd', function(dt){
        var m = dt.getDate()+1;
        return (m<10 ? '0' : '') + m;
    });
    
    angular.module('ngUtils').filter('ngUtilsDate', [function(){
        
        return function(input, mask) {
            if (input){
                return input.format(mask || 'locale');
            }
        };
        
    }]);

}());
