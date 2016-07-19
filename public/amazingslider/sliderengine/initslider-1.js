jQuery(document).ready(function(){

    var scripts = document.getElementsByTagName("script");

    var jsFolder = "";

    for (var i= 0; i< scripts.length; i++)

    {

        if( scripts[i].src && scripts[i].src.match(/initslider-1\.js/i))

            jsFolder = scripts[i].src.substr(0, scripts[i].src.lastIndexOf("/") + 1);

    }

    jQuery("#amazingslider-1").amazingslider({

        sliderid:1,

        jsfolder:jsFolder,

        width:1200,

        height:560,

        skinsfoldername:"",

        loadimageondemand:false,

        videohidecontrols:false,

        fullwidth:false,

        donotresize:false,

        enabletouchswipe:true,

        fullscreen:false,

        autoplayvideo:false,

        addmargin:true,

        transitiononfirstslide:false,

        forceflash:false,

        isresponsive:true,

        forceflashonie11:true,

        forceflashonie10:true,

        pauseonmouseover:false,

        playvideoonclickthumb:true,

        slideinterval:5000,

        randomplay:false,

        scalemode:"fill",

        loop:0,

        autoplay:true,

        navplayvideoimage:"play-32-32-0.png",

        navpreviewheight:100,

        timerheight:2,

        descriptioncssresponsive:"font:bold 12px",

        shownumbering:false,

        skin:"Ribbon",

        addgooglefonts:false,

        navshowplaypause:true,

        navshowplayvideo:true,

        navshowplaypausestandalonemarginx:8,

        navshowplaypausestandalonemarginy:8,

        navbuttonradius:0,

        navthumbnavigationarrowimageheight:32,

        navmarginy:16,

        lightboxshownavigation:true,

        showshadow:false,

        navfeaturedarrowimagewidth:16,

        navpreviewwidth:200,

        googlefonts:"",

        navborderhighlightcolor:"",

        navcolor:"#999999",

        lightboxdescriptionbottomcss:"{color:#333; font-size:12px; font-family:Arial,Helvetica,sans-serif; overflow:hidden; text-align:left; margin:4px 0px 0px; padding: 0px;}",

        lightboxthumbwidth:150,

        navthumbnavigationarrowimagewidth:32,

        navthumbtitlehovercss:"text-decoration:underline;",

        navthumbmediumheight:64,

        texteffectresponsivesize:600,

        arrowwidth:32,

        texteffecteasing:"easeOutCubic",

        texteffect:"fade",

        lightboxthumbheight:80,

        navspacing:4,

        navarrowimage:"navarrows-28-28-0.png",

        bordercolor:"#ffffff",

        ribbonimage:"ribbon_topright-0.png",

        navwidth:24,

        navheight:24,

        arrowimage:"arrows-32-32-0.png",

        timeropacity:0.6,

        arrowhideonmouseleave:1000,

        navthumbnavigationarrowimage:"carouselarrows-32-32-0.png",

        navshowplaypausestandalone:false,

        texteffect1:"slide",

        navpreviewbordercolor:"#ffffff",

        texteffect2:"slide",

        customcss:"",

        ribbonposition:"topright",

        navthumbdescriptioncss:"display:block;position:relative;padding:2px 4px;text-align:left;font:normal 12px Arial,Helvetica,sans-serif;color:#333;",

        lightboxtitlebottomcss:"{color:#000; font-size:14px; font-family:Armata,sans-serif,Arial; overflow:hidden; text-align:left;}",

        arrowstyle:"mouseover",

        navthumbmediumsize:800,

        navthumbtitleheight:20,

        textpositionmargintop:24,

        buttoncssresponsive:"",

        navswitchonmouseover:false,

        playvideoimage:"playvideo-64-64-0.png",

        arrowtop:50,

        textstyle:"static",

        playvideoimageheight:64,

        navfonthighlightcolor:"#666666",

        showbackgroundimage:false,

        navpreviewborder:4,

        navshowplaypausestandaloneheight:28,

        navdirection:"horizontal",

        navbuttonshowbgimage:true,

        navbuttonbgimage:"navbuttonbgimage-28-28-0.png",

        textbgcss:"",

        textpositiondynamic:"bottomleft",

        playvideoimagewidth:64,

        buttoncss:"display:block; position:relative; margin-top:8px;",

        navborder:4,

        navshowpreviewontouch:true,

        bottomshadowimagewidth:96,

        showtimer:true,

        navradius:0,

        navmultirows:false,

        navshowpreview:true,

        navpreviewarrowheight:8,

        navmarginx:16,

        navfeaturedarrowimage:"featuredarrow-16-8-0.png",

        navthumbsmallsize:480,

        showribbon:true,

        navstyle:"bullets",

        textpositionmarginleft:24,

        descriptioncss:"display:block; position:relative; font:12px \"Lucida Sans Unicode\",\"Lucida Grande\",sans-serif,Arial; color:#fff; margin-top:8px;",

        navplaypauseimage:"navplaypause-28-28-0.png",

        backgroundimagetop:-10,

        timercolor:"#ffffff",

        numberingformat:"%NUM/%TOTAL ",

        navthumbmediumwidth:64,

        navfontsize:12,

        navhighlightcolor:"#333333",

        texteffectdelay1:1000,

        navimage:"bullet-24-24-1.png",

        texteffectdelay2:1500,

        texteffectduration1:600,

        navshowplaypausestandaloneautohide:false,

        texteffectduration2:600,

        navbuttoncolor:"#999999",

        navshowarrow:true,

        texteffectslidedirection:"left",

        navshowfeaturedarrow:false,

        lightboxbarheight:64,

        titlecss:"display:block; position:relative; font:bold 16px \"Segoe UI Light\",\"Lucida Grande\",sans-serif,Arial; color:#e4df98; ",

        ribbonimagey:-8,

        ribbonimagex:-8,

        navthumbsmallheight:48,

        texteffectslidedistance1:120,

        texteffectslidedistance2:120,

        navrowspacing:8,

        navshowplaypausestandaloneposition:"bottomright",

        shadowsize:5,

        lightboxthumbtopmargin:12,

        titlecssresponsive:"font:bold 12px",

        navshowplaypausestandalonewidth:28,

        navthumbresponsive:false,

        navfeaturedarrowimageheight:8,

        navopacity:0.8,

        textpositionmarginright:24,

        backgroundimagewidth:120,

        textautohide:true,

        navthumbtitlewidth:120,

        navpreviewposition:"top",

        texteffectseparate:false,

        arrowheight:32,

        shadowcolor:"#aaaaaa",

        arrowmargin:8,

        texteffectduration:600,

        bottomshadowimage:"bottomshadow-110-95-3.png",

        border:0,

        lightboxshowdescription:false,

        timerposition:"bottom",

        navfontcolor:"#333333",

        navthumbnavigationstyle:"arrow",

        borderradius:0,

        navbuttonhighlightcolor:"#333333",

        textpositionstatic:"bottom",

        texteffecteasing2:"easeOutCubic",

        navthumbstyle:"imageonly",

        texteffecteasing1:"easeOutCubic",

        textcss:"display:block; padding:12px; text-align:left;background-color:rgba(0, 0, 0, 0.5);",

        navthumbsmallwidth:48,

        navbordercolor:"#ffffff",

        navpreviewarrowimage:"previewarrow-16-8-0.png",

        navthumbtitlecss:"display:block;position:relative;padding:2px 4px;text-align:left;font:bold 14px Arial,Helvetica,sans-serif;color:#333;",

        showbottomshadow:true,

        texteffectslidedistance:30,

        texteffectdelay:500,

        textpositionmarginstatic:0,

        backgroundimage:"",

        navposition:"bottom",

        texteffectslidedirection1:"right",

        navpreviewarrowwidth:16,

        textformat:"Bottom left",

        texteffectslidedirection2:"right",

        bottomshadowimagetop:95,

        texteffectresponsive:true,

        navshowbuttons:false,

        lightboxthumbbottommargin:8,

        textpositionmarginbottom:24,

        lightboxshowtitle:true,

        slice: {

            duration:1500,

            easing:"easeOutCubic",

            checked:true,

            effects:"up,down,updown",

            slicecount:10

        },

        transition:"slice",

        scalemode:"fill",

        isfullscreen:false,

        textformat: {



        }

    });

});