/**
 * ngUtils.Number.js
 */
(function(){
    var GROUP_SEP          = ',', 
        DECIMAL_SEPARATOR  = '.',
        CURRENCY_SYM       = '$';
    
    Number.locale = function(locale){
        GROUP_SEP          = locale.NUMBER_FORMATS.GROUP_SEP, 
        DECIMAL_SEPARATOR  = locale.NUMBER_FORMATS.DECIMAL_SEP;
        CURRENCY_SYM       = locale.NUMBER_FORMATS.CURRENCY_SYM;
    };
    
    Number.format = numberFormat;
    Number.prototype.format = function(decimals, thousandSeparator, decimalSeparator){
        return numberFormat(this, decimals, thousandSeparator, decimalSeparator);
    };
    
    Number.currency = currencyFormat;
    Number.prototype.currency = function(decimals){
        return currencyFormat(this, decimals);
    };
    
    /**
     * @filter ngUtilsNumber
     * @author Fábio Nogueira <fabio.bacabal@gmail.com>
     * @example
     *      <!-- exemplo 01 | HTML ->
     *      <div>
     *          {{123456 | ngUtilsNumber:2:'.':','}}
     *          <!-- Resulta em: 123.456,00 -->
     *      </div>
     *      
     *      //Exemplo 02 | JAVASCRIPT
     *      angular
     *          .module('app', ['ngUtils'])
     *          .controller('app', ['ngUtilsNumber', function (ngUtilsNumber) {
     *              var f = ngUtilsNumber(1234567, 3, ',', '.');
     *              //f será igual a: 1,234,567.000
     *          }]);
    */

    angular.module('ngUtils').filter('ngUtilsNumber', [function(){
            
        return function(input, decimals, thousandSeparator, decimalSeparator) {
            if (input){
                input = Number(input);
                
                if (thousandSeparator==='currency'){
                    return currencyFormat(input, decimals);
                }
                
                return numberFormat(input, decimals, thousandSeparator, decimalSeparator);
            }
        };
        
    }]);
    
    function numberFormat(value, decimals, thousandSeparator, decimalSeparator){
        var re, num, x=3;
        
        decimals          = decimals===undefined ? 0 : decimals;
        thousandSeparator = thousandSeparator || GROUP_SEP;
        decimalSeparator  = decimalSeparator  || DECIMAL_SEPARATOR;
        
        re = '\\d(?=(\\d{' + (x) + '})+' + (decimals > 0 ? '\\D' : '$') + ')';
        num = value.toFixed(Math.max(0, ~~decimals));
        
        return (decimalSeparator ? num.replace('.', decimalSeparator) : num).replace(new RegExp(re, 'g'), '$&' + (thousandSeparator));
    };
    function currencyFormat(value, decimals){
        return CURRENCY_SYM + numberFormat(value, decimals);
    }
    
}());