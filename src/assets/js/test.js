/* IF YOU'RE READING THIS COMMENT, IT MEANS THE YOU'RE SEEING THE SITE ON ITS NEW RACKSPACE HOSTING */
// popup form
if($('body.nopopup').length==0) {
    pop = window.setTimeout(function(){
        if($(window).width()<1200 || ($(window).width()>=1200 && $('#floater').length==0)) {
            $('#formModal').modal('show');
        }
    },20000);
    // cancel popup form if any other form touched
    $('input,select,a,iframe').on('focus click change',function(){
        window.clearTimeout(pop);
    });
}

images = [];
function loadBTF() {

    /* $('iframe[data-src],img[data-src]').each(function(){

        $(this).prop('src',$(this).data('src'));
        $(this).data('src','');
    }); */
};
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return results[1] || 0;
    }
}
// autoscroll anchors
function anim(p) {
    if(p=='top')
        target = 0;
    else
        target = p.top - 85;

    if($('.fixedheader').length&&$(window).width()<=bpWidth)
        target -= $('#header').height();

    $('html,body').animate({
        scrollTop:target+'px'
    },500);
}
function doSlides(el) {
    var nextSlide = el.data('activeSlide')+1;
    if(nextSlide <= lastSlide) {
        var curSrc = el.find('img').attr('src');
        el.find('img').attr('src',curSrc.replace(/\d+/g,nextSlide));
        var me = el;
        el.data('activeSlide',nextSlide);
        el.data('timer',window.setTimeout(function(){
            doSlides(me)
        },400));
    }
}
function preload() {
    for (i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = arguments[i];
    }
}
function validateCancellationForm(f) {

    isValid = true;

    f.find('input,select,textarea').each(function(){

        if($(this).val()==''&&$(this).prop('name')!='other_comments') {
            $(this).removeClass('error');
            $(this).addClass('error');
            $(this).off().change(function(){
                $(this).removeClass('error');
            });
            isValid = false;
        } else {
            $(this).removeClass('error');
        }
    });

    var pi = f.find("input[name='phone']");
    pi.val(pi.val().replace(/^0044/,'0'));
    pi.val(pi.val().replace(/^\+44/,'0'));
    pi.val(pi.val().replace(' ','').trim());
    var p = pi.val();
    if(f.find("input[name='phone']").val()!='') {

        var pr = /^[0-9\s]+$/;
        if(!pr.exec(p.trim())) {
            alert("Please enter your phone number using only numbers/spaces.");
            isValid = false;
        } else {
            if(p.length!=11) {
                alert("Please ensure that your phone number contains 11 digits.");
                isValid = false;
            } else {
                // okay, only 11 numbers. Check that at least 5 are different
                var n = [];
                var distinctNumbers = 0;
                for (var i = 0; i < p.length; i++) {
                    if(typeof n['number'+p.charAt(i)] == 'undefined') {
                        n['number'+p.charAt(i)] = p.charAt(i);
                        distinctNumbers++;
                    }

                }
                if(distinctNumbers<5) {
                    alert("Please ensure that your phone number contains at least 5 different digits.");
                    isValid = false;
                }
            }
        }

    }
    if(isValid)
        return true;
    else {
        return false;
    }
}
function validateForm(f) {
    err = '';
    var errEls = [];
    if(f.find("[name='treatment']").val()=='') {
        err+="You need to select a treatment.\n";
        errEls.push(f.find("[name='treatment']"));
    }
    if(f.find("input[name='first_name']").val()=='') {
        err+="You need to enter your first name.\n";
        errEls.push(f.find("input[name='first_name']"));
    }
    if(f.find("input[name='last_name']").val()=='') {
        err+="You need to enter your surname.\n";
        errEls.push(f.find("input[name='last_name']"));
    }
    if(f.find("input[name='phone']").val()=='') {
        err+="You need to enter your phone number.\n";
        errEls.push(f.find("input[name='phone']"));
    }
    var pi = f.find("input[name='phone']");
    pi.val(pi.val().replace(/^0044/,'0'));
    pi.val(pi.val().replace(/^\+44/,'0'));
    pi.val(pi.val().replace(' ','').trim());
    var p = pi.val();
    if(f.find("input[name='phone']").val()!='') {

        var pr = /^[0-9\s]+$/;
        if(!pr.exec(p.trim())) {
            alert("Please enter your phone number using only numbers/spaces.");
            isValid = false;
            err = 'phone number error';
        } else {
            if(p.length!=11) {
                alert("Please ensure that your phone number contains 11 digits.");
                isValid = false;
                err = 'phone number error';
            } else {
                // okay, only 11 numbers. Check that at least 5 are different
                var n = [];
                var distinctNumbers = 0;
                for (var i = 0; i < p.length; i++) {
                    if(typeof n['number'+p.charAt(i)] == 'undefined') {
                        n['number'+p.charAt(i)] = p.charAt(i);
                        distinctNumbers++;
                    }

                }
                if(distinctNumbers<5) {
                    alert("Please ensure that your phone number contains at least 5 different digits.");
                    isValid = false;
                    err = 'phone number error';
                }
            }
        }

    }

    if(f.find("input[name='email']").val()=='') {
        err+="You need to enter your email.\n";

        errEls.push(f.find("input[name='email']"));
    }
    if(f.find("input[name='postcode']").length&&f.find("input[name='postcode']").val()=='') {
        err+="You need to enter your postcode.\n";

        errEls.push(f.find("input[name='postcode']"));
    }
    /* if(f.find("[name='source']").val()=='') {
        err+="Please tell us where you heard about us.\n";
        errEls.push(f.find("[name='source']"));
    } */
    if(err=='')
        return true;
    else {
        for (i in errEls) {
            errEls[i].removeClass('error');

            errEls[i].off().change(function(){
                $(this).removeClass('error');
            });
            errEls[i].addClass('error');
        }
        // alert(err);
        return false;
    }
};
$(document).ready(function(){

    $("form[action='/consultation.php']").submit(function(event){

        if(validateForm($(this))) {
            return true;
        } else {
            return false;
        }


    });
    $("form[action='/patient_submission.php']").submit(function(event){

        if(validateCancellationForm($(this))) {
            return true;
        } else {
            return false;
        }


    });







    // cancel popup form if any other form touched
    $('input,select,a').on('focus click change',function(){
        if(typeof pop !== 'undefined') window.clearTimeout(pop);
    });

    $('.fpanel a').click(function(e){

        e.stopPropagation();
        if($(this).attr('href').indexOf('#')==0) {
            var i = $(this).parent().index('.fpanel');
            e.preventDefault();
            $('.expandedPanel:eq('+i+')').slideDown(500,function(i){
                $(this).addClass('active');
                var wh = $(window).height();
                if($(this).height()>wh){
                    // show bottom corner close button
                    $(this).find('a.corner').fadeIn(500);
                } else {
                    $(this).find('a.corner').not('.top').fadeOut(500);
                }
                // if ($(window).width()<=bpWidth)
                anim($('#panelsAnchor').offset());
            });
            $('#coverLight').fadeIn(500);
            $('.blurMe').addClass('blur');
        }
    });

    $('.fpanel').click(function(){
        h = $(this).find('a').attr('href');
        if(h=='#')
            $(this).find('a').click();
        else
            location.href=h;
    });


    /* instant quote form handlers */
















    // generic video links
    $('a.play').click(function(e){
        e.preventDefault();
        $('#videoModal').modal('show');
        $('#videoModal .videoContainer').html($(this).data('iframe'));

    });

    // kill iframe on close
    $('#videoModal').on('hidden.bs.modal', function () {
        $(this).find('.videoContainer').html('');
    })



    // Add scrollspy to <body>
    $('body').scrollspy({offset: 50});









});











