/**
 * SAHILIVALIDATE 
 *
 *
 * VERSION 0.1.0
 * - added: error handling
 * - validate required fields
 * - validate email
 *
 * CAHNGELOG
 * 
 * VERSION 1.0
 * 
 *
 *
 * author Dominik Matt <mail@matt-dominik.at>
 */


$.fn.sahiliValidate = function(options){
    
    var svClass = function($form) {
        
    
        options = $.extend({
            requireClass: 'required',
            highlightError: function($element) {},
            unhighlightError: function($element) {},
        }, options);
        
        var errorCodes = {
            required: {
                msg: 'Dieses Feld ist ein Pflichtfeld.',
                errorClass: 'required-error error'
            },
            
            email: {
                msg: 'Keine gültige Email Adresse.',
                errorClass: 'email-error error'
            }
        };
        
        var sv = {
            error: [],
            hasBeenSent: false,
            curElementError: false,
            
            init: function()
            {
                $form.on('submit', function() {
                    
                    $form.find('input, textarea').each(function() {
                        sv.checkForm($(this));
                    });
                    
                    $form.find('input').bind('keyup', function() {
                       if(sv.hasBeenSent == true) {
                           sv.checkForm($(this));
                       } 
                    });
                    
                    sv.sendForm();
                    return false; 
                });
            },
            
            checkForm: function($element) 
            {
                sv.curElementError = false;
                if($element.is('input')) {
                    sv.checkRequiredInput($element);
                    sv.checkValidEmail($element);
                }
                
                if($element.is('textarea')) {
                    sv.checkRequiredInput($element);
                }
                
                if(sv.curElementError == false) {
                    sv.removeError($element);
                } else {
                    sv.addErrors();
                }
            },
            
            checkRequiredInput: function($element)
            {
                if($element.data('required') == true) {
                    var val = $element.val().trim();
                    if(val == '') {
                        sv.addError($element, 'required');
                    }
                }
            },
            
            checkValidEmail: function($element) {
                var val = $element.val();
                console.log(($element.data('email') == true || $element.attr('type') == 'email') && ($element.data('required') == true && val != ''));
                if(($element.data('email') == true || $element.attr('type') == 'email') && ($element.data('required') == true && val != '')) {
                    console.log('ok');
                    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                    if(pattern.test(val) == false) {
                        sv.addError($element, 'email');
                    }
                }
            },
            
            sendForm: function() 
            {
                sv.hasBeenSent = true;
                var send = true;
                $.each(sv.error, function(index, value) {
                    if(value != -1) {
                        send = false;
                    }    
                });
                
                if(send == true) {
                    $form.submit();
                } else {
                    sv.addErrors();
                }
            },
            
            addError: function($element, errorCode)
            {
                if($element.data('error-index') == -1 || $element.data('error-index') == undefined) {
                    sv.error.push({
                        errorCode: errorCode,
                        element: $element
                    });
                    $element.data('error-index', (sv.error.length-1));  
                }
                sv.curElementError = true;
            },
            
            removeError: function($element)
            {
                
                $.each(errorCodes, function(index, errorCode) {
                    var errorIndex = $element.data('error-index');
                    if(errorIndex != -1 && errorIndex != undefined) {
                        sv.error[errorIndex] = -1;
                        $element.data('error-index', -1);
                    }
                    $element.removeClass(errorCode['errorClass']);
                });  
            },
            
            addErrors: function() 
            {
                $.each(sv.error, function(index, error) {
                    if(error != -1) {
                        error['element'].addClass(errorCodes[error['errorCode']].errorClass);
                    }
                });
            }
        };
        
        sv.helper = {

        }
        
        sv.init();
    

    };
    
    return new svClass($(this));
    
};