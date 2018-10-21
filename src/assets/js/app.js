
var $ = jQuery;


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
function closeModal(id) {
    if(id instanceof jQuery) {
        $('#cover').fadeOut(800);
        id.fadeOut(800);
    } else {
        $('#cover,#'+id+'ModalOuter').fadeOut(800);
        $('#videoModalOuter .modal-content .modal-body iframe').attr('src','');
    }
}
function doVideo(newSrc) {
    if(newSrc!=''&&$('#videoModalOuter .modal-content .modal-body').attr('src')!=newSrc)
        $('#videoModalOuter .modal-content .modal-body iframe').attr('src',newSrc);
    return false;
}
function openModal(id) {

    if(id instanceof jQuery) {
        $('#cover').show();
        id.fadeIn(200);
    } else
        $('#cover,#'+id+'ModalOuter').fadeIn(200);

    $('html,body').animate({scrollTop:0},'fast');

}


// asdas

// Select all links with hashes


// asasd




$(document).ready(function() {

    $('.nav-anchor li a').click(function() {
        var target = $(this.hash);
        if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
        if (target.length == 0) target = $('html');
        $('html, body').animate({ scrollTop: target.offset().top - 54}, 1000);
        return false;
    });

    // var spy = new ScrollSpy('#posh', {
    //     nav: '.nav-anchor ul li a',
    //     className: 'active',
    //     callback: function () {
    //     }
    // })



    // close modal if overlay tapped/clicked
    $('#cover,.modal').click(function(e) {
        if(e.target == this) {
            closeModal('video');
            closeModal('image');
            closeModal('form');
            closeModal('quote');
            closeModal('remarket');
            closeModal('guarantee');
        }

    });

    $('.openForm').click(function(e){
        e.preventDefault();
        openModal('form');
    });

    $('#guaranteeModalOuter').on('.modal', function () {
        $('#guaranteeModalOuter .modal-content .modal-body ').css('overflow-y', 'auto');
        $('#guaranteeModalOuter .modal-content .modal-body').css('max-height', $(window).height() * 0.7);
    });

    $('.guaranteePopup').click(function(e){

        e.preventDefault();
        openModal('guarantee');
        $('#guaranteeModalOuter .modal-content .modal-body ').css('overflow-y', 'auto');
        $('#guaranteeModalOuter .modal-content .modal-body').css('max-height', $(window).height() * 0.7);
    });

    $('.close').click(function(e){
        e.preventDefault();
        closeModal('video');
        closeModal('image');
        closeModal('form');
        closeModal('quote');
        closeModal('remarket');
        closeModal('guarantee');
    });

    $('a.play').click(function(e){
        e.preventDefault();
        if(!$(this).hasClass('big')) {
            openModal('video');
            // doVideo('data-iframe');
            $('#videoModalOuter .modal-body').html($(this).data('iframe'));
        }
    });

    // kill iframe on close
    $('#videoModalOuter').on('.modal', function () {
        $('#videoModalOuter .modal-content .modal-body iframe').attr('src','');
        $(this).find('#videoModal .modal-body').html('');
    });

    // kill iframe on close
    $('#videoModalOuter').on('.modal', function () {
        $('#videoModalOuter .modal-content .modal-body iframe').attr('src','');
        $('#videoModalOuter').find('#cover', '#videoModalOuter').html('');
    });


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

    // // remarketing popup?
    // if($.urlParam('rm')=='y') {
    //     window.setTimeout(function(){
    //         openModal('remarket');
    //     },250);
    // } else {
    //     if($('#formModalOuter').length) {
    //         if($('.site').length)
    //             var fto = 40000; // longer timeout on site pages
    //         else
    //             var fto = 40000;
    //         pop = window.setTimeout(function(){
    //             openModal('form');
    //         },fto);
    //     }
    // }

    // defer FB pixel
    // var dfbp = setTimeout(function(){
    //     !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    //         n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    //         n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    //         t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    //         document,'script','https://connect.facebook.net/en_US/fbevents.js');
    //     fbq('init', '1477526785873521'); // Insert your pixel ID here.
    //     fbq('track', 'PageView');
    // },3000);

    // defer GA loading
    // var dlga = setTimeout(function(){
    //
    //     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    //         (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    //         m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    //     })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    //
    //     ga('create', 'UA-58568623-1', 'auto');
    //     ga('send', 'pageview');
    // },1200);

    // defer ResponseTap loading
    // var dlrt = setTimeout(function(){
    //     var headID = document.getElementsByTagName("head")[0];
    //     adiInit = "35441";
    //     adiRVO = true;
    //     adiFunc = null;
    //     // (function() {
    //     adiSrc = document.createElement("script"); adiSrc.type = "text/javascript";
    //     adiSrc.async = true;
    //     adiSrc.src = ("https:" == document.location.protocol ? "https://static-ssl" : "http://static-cdn")+ ".responsetap.com/static/scripts/rTapTrack.min.js";
    //
    //     // var s = document.getElementsByTagName("script")[0];
    //     // s.parentNode.insertBefore(adiSrc, s);
    //     headID.appendChild(adiSrc);
    //     // })();
    // },500);

    // delayed load of above-the-fold reviews widget
    var dr = setTimeout(function() {
        $('#widgetOuter').addClass('visible');
    }, 500);

    // delayed load of reviews row
    if($('#carousel-widget-360').length) {
        var dlrw = setTimeout(function() {
            var headID = document.getElementsByTagName("head")[0];
            var newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            newScript.src = 'https://widget.reviews.co.uk/carousel/dist.js';
            headID.appendChild(newScript);

            var lw = setTimeout(function() {
                if(typeof carouselWidget === 'undefined') {
                    // try again
                    var lw2 = setTimeout(function() {
                        if(typeof carouselWidget !== 'undefined') {
                            carouselWidget('carousel-widget-360',{
                                store: 'finest-dental',
                                primaryClr: '#1d8fd5',
                                neutralClr: '#f4f4f4',
                                reviewTextClr: '#494949',
                                layout:'fullWidth',
                                numReviews: 21
                            });
                        }
                    }, 1500);
                } else {
                    carouselWidget('carousel-widget-360',{
                        store: 'finest-dental',
                        primaryClr: '#1d8fd5',
                        neutralClr: '#f4f4f4',
                        reviewTextClr: '#494949',
                        layout:'fullWidth',
                        numReviews: 21
                    });
                }
            }, 1500);
        }, 1500);
    }

    // Add scrollspy to <body>
    $('body').scrollspy({offset: 50});

});





