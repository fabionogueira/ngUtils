/**
 * ngUtils.js
 * @version 1.0.0
 */
(function(){
    var locale;
    
    angular.module('ngUtils',[])
        .run(['$locale', function($locale){
            locale = window.i18n ? window.i18n.locale : $locale;
            
            if (Date.locale) Date.locale(locale);
            if (Number.locale) Number.locale(locale);
            
            locale.phrase = locale.phrase || {};
            locale.term   = locale.term   || {};
        }])
        .provider('$ngUtils', function(){
            var locale = {};

            var ngUtilsService = {
                locale: function(){
                    return locale;
                }
            };

            return {
                //config
                locale: function(value){
                    locale = value;
                },

                //service
                $get: function(){
                    return ngUtilsService;
                }            
            };

        });
        
}());
