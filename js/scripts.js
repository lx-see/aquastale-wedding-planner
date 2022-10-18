$(function(){

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/sw.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope)
          }).catch(function (err) {
            console.warn('ServiceWorker registration failed: ', err)
          })
        })
    }

    var windowWidth = $(window).width();
    var offset = $(window).height();

    $("#nav-bar").css('width', windowWidth);
    $("#about-frame").css('width', windowWidth+61);
    $("#nav-bar").hide();

    //Adjust the width while window resize
    $(window).resize(function () { 
        windowWidth = $(window).width();
        offset = $(window).height()
        $("#nav-bar").css('width', windowWidth);
        $("#about-frame").css('width', windowWidth+61);
        if($(window).width()<=768){
            $("#contact-form-after").show();
        }
    });

    //Home signup & contact btn
    $("#btn-signup").click(function (e) { 
        window.location.href="login.html";
    });
    $("#btn-contact").click(function (e) { 
        window.location.href="contact.html";
    }); 

    //Nav bar
    var pathname = window.location.pathname;
    if(pathname.indexOf("index.html")>0 || pathname == "/aquastale/"){
        if($(window).width()>768){
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= offset ) {
                    $("#nav-bar").show();
                } else {
                    $("#nav-bar").fadeOut();
                }
            });
        }
        else{
            $("#nav-bar").show();
        }
    }
    else{
        $("#nav-bar").show();
    }

    //Service image Hover effect
    if($(window).width()>980){
        $(".service-img").hover(function (e) {
            var serviceImg = "#" + this.id + " img";
            var cap = "#" + this.id + " .img-caption";
            $(cap).fadeIn();
            $(serviceImg).css({'filter':'blur(3px)'});
        }, function () {
            var serviceImg = "#" + this.id + " img";
            var cap = "#" + this.id + " .img-caption";
            $(serviceImg).css('filter', 'none');
            $(cap).fadeOut();
        });
    }

    //Contact Page
    if(pathname.indexOf("contact.html")>0){
        $("#contact-form").submit(function (e) {
            var e = e;
            var cusName = $("input[name='cusName']").val();
            var cusEmail = $("input[name='emailAdd']").val();
            var cusPhone = $("input[name='phoneNum']").val();
            var message = $("textarea[name='cusMsg']").val();
    
            var warningMsg = "";
    
            //Validate username
            if(!(validateEmptyInput(cusName))){
                e.preventDefault();
                warningMsg = "Username cannot be empty!";
                $("input[name='cusName']").attr("placeholder",warningMsg);
                $("input[name='cusName']").css("border","1px solid red");
            }
            else{
                $("input[name='cusName']").prev().prev().html("");
                $("input[name='cusName']").css("border","none");
            }
    
            //Validate email
            if(!validateEmptyInput(cusEmail)){
                warningMsg = "Email cannot be empty!";
                $("input[name='emailAdd']").attr("placeholder",warningMsg);
                $("input[name='emailAdd']").css("border","1px solid red");
            }
            else{
                $("input[name='emailAdd']").attr("placeholder","");
                if(!validateEmailAdd(cusEmail)){
                    e.preventDefault();
                    warningMsg = "Invalid email address!";
                    $("input[name='emailAdd']").attr("placeholder",warningMsg);
                    $("input[name='emailAdd']").css("border","1px solid red");
                }
                else{
                    $("input[name='emailAdd']").prev().prev().html("");
                    $("input[name='emailAdd']").css("border","none");
                }
            }
    
            //Validate phone number
            if(!(validateEmptyInput(cusPhone))){
                e.preventDefault();
                warningMsg = "Phone number cannot be empty!";
                $("input[name='phoneNum']").attr("placeholder",warningMsg);
                $("input[name='phoneNum']").css("border","1px solid red");
            }
            else{
                $("input[name='phoneNum']").prev().prev().html("");
                $("input[name='phoneNum']").css("border","none");
            }
    
            //Validate customer message
            if(!(validateEmptyInput(message))){
                e.preventDefault();
                warningMsg = "Message cannot be empty!";
                $("textarea[name='cusMsg']").attr("placeholder",warningMsg);
                $("textarea[name='cusMsg']").css("border","1px solid red");
            }
            else{
                $("textarea[name='cusMsg']").prev().prev().html("");
                $("textarea[name='cusMsg']").css("border","none");
            }

            //Submit message - No server - Show message
            var flag = validateEmptyInput(cusName)&&validateEmptyInput(cusEmail)&&validateEmptyInput(cusPhone)&&validateEmptyInput(message)&&validateEmailAdd(cusEmail);
            if(flag){
                $("#displayMsg .modal-title").html("Your Submitted Message");
                $("#displayMsg .modal-body").html("");
                var html = "<p><div><b>Congrats! You have submitted the following message: </b></div>";
                html += "<br/><div><b>Name: </b><br/>"+cusName+"</div>";
                html += "<div><b>Email: </b><br/>"+cusEmail+"</div>";
                html += "<div><b>Phone Number: </b><br/>"+cusPhone+"</div><div><b>Message: </b></div>";
                html += "<div>"+message+"</div><div><br/><b>We will contact you soon!</b></div></p>";
                $("#displayMsg .modal-body").append(html);
                $("#displayMsg").modal('show');
            }

        });

        $("#appForm").submit(function (e) { 
            var name = $("#appUserName").val();
            var budget = $("#budget").val();
            var inputDatetime = $("#meeting-time").val();
            var datetime = new Date(inputDatetime);
            var remark = $("#reviewContent").val();

            //Validate name
            if(!(validateEmptyInput(name))){
                e.preventDefault();
                $("#appUserName").attr("placeholder","Your Name cannot be empty!");

                $("#appUserName").parent().addClass("has-error");
            }
            else{
                $("#appUserName").attr("placeholder","");
                $("#appUserName").parent().removeClass("has-error");
            }            
            
            var flag;
            flag = validateEmptyInput(name);
            if(flag){
                //Save appointment datetime to cookies
                document.cookie = "appDatetime="+datetime+"; expires="+datetime.toUTCString();
                $("#appModal").modal('hide');

                //Submit appointment - No server - Show appointment
                $("#displayMsg .modal-title").html("Your Appointment Details");
                $("#displayMsg .modal-body").html("");
                var html = "<p><div><b>Congrats! You had successfully made an appointment with us!</b><br/><b>The appointment details: </b></div>";
                html += "<br/><div><b>Name: </b><br/>"+name+"</div>";
                html += "<div><b>Budget: </b><br/>"+budget+"</div>";
                html += "<div><b>Appointment Datetime: </b><br/>"+datetime+"</div><div><b>Remark: </b></div>";
                html += "<div>"+(remark==""?'-':remark)+"</div><div><br/><b>We are exciting to see you soon!</b></div></p>";
                $("#displayMsg .modal-body").append(html);
                $("#displayMsg").modal('show');
            }
        });

        var appDatetime;
        var flag = getCookie("appDatetime");
        setInterval(function(){
            if (!flag == ""){

            //Show appointment datetime
            appDatetime = new Date(getCookie("appDatetime")).format("yyyy-MM-dd hh:mm:ss");
            $("#appDateTime").html(appDatetime);

            //Countdown before appointment datetime
            var now = new Date();
            var appDay = new Date(getCookie("appDatetime"));
            var difference = Math.floor((appDay-now)/1000);
    
            var seconds = fixIntegers(difference % 60);
            difference = Math.floor(difference / 60);
    
            var minutes = fixIntegers(difference % 60);
            difference = Math.floor(difference / 60);
    
            var hours = fixIntegers(difference % 24);
            difference = Math.floor(difference / 24);
    
            var days = difference;
            $("#timeLeft").html(days+' days '+hours+' hours '+minutes+' minutes '+seconds+' seconds');
            }
        },1000);
    
        if (!flag == ""){
            // Web notification
            if(!('Notification' in window)){
                console.log("This browser does not support notification!");
            }
            else{
                Notification.requestPermission(status => {
                    appDatetime = new Date(getCookie("appDatetime")).format("yyyy-MM-dd hh:mm:ss");
                    appDatetime = appDatetime==null?null:appDatetime;
                    if(!(appDatetime==null)){
                        var option={
                            title: 'Your appointment date:',
                            description: '<div style="font-weight:bold;">We are exciting to see you in '+appDatetime+'!</div>',
                            type: 'success',
                            closeTimeout: 4000,
                            closeWith: ['click', 'button'],
                            animation: {
                                open: 'slide-in',
                                close: 'slide-out'
                            },
                            animationDuration: .2,
                            position: 'bottom-right',      
                        };
                        GrowlNotification.notify(option);
                    }
                });
            }
        }        
    }

    //Service Page
    if(pathname.indexOf("service.html")>0){
        $("#serviceOne a").hover(function (e) {
            $(this).children("p").css('color', '#e44c65');
        }, function () {
            $(this).children("p").css('color', 'white');
        });

        $(".service-theme").click(function (e) {
            var id = $(this).attr("data-themeId");
            $(location).attr("href","service-article.html?id="+id);           
        });
    }

    //Service Article Page
    var articleList = [];
    var saveArticleList = [];
    if(pathname.indexOf("service-article.html")>0){
        var id = getQueryString("id"); //themeId
        var articleId = getQueryString("articleId"); //articleId
        var article = new Object;
        var html = "";
        var articleNum = 0;
        $.ajax({
            type: "GET",
            url: "data/article.json",
            data: {},
            dataType: "json",
            success: function (response) {
                var obj = [];
                obj = JSON.parse(localStorage.getItem("articleList"));
                obj = obj==null?[]:obj;
                saveArticleList = obj;
                console.log(obj);
                
                var allArticles = response;
                $.each(allArticles, function (i, item) { 
                    article = item;
                    article.saveStatus = '0';
                    $.each(obj, function (i, item) {
                         if(article.id==item.id){
                             article.saveStatus = '1';
                         }
                    });
                    
                    articleList.push(article);
                    if(item.themeId==id && articleNum<1 && articleId==null){
                        html = "";
                        html += '<div class="col-xs-12" data-id="'+article.id+'"><a href="#" class="favourite-icon glyphicon glyphicon-star star-lg" data-saveStatus="'+article.saveStatus+'" onclick="return false"></a><img id="article-img" alt="" src="'+article.img+'"></div>'; 
                        html += '<div class="col-xs-12" id="article-theme">Theme: '+(article.themeId=='1'?'Fairytale':(article.themeId=='2'?'Chinese':(article.themeId=='3'?'Romance':(article.themeId=='4'?'Flora':''))))+' | '+article.title+'</div>';  
                        html += '<div id="article-author">'+article.author+'</div>';
                        html += '<div id="article-content">'+article.content+'</div>';
                        $("#article-body #content").append(html);
                        articleNum++;
                    }
                    else if(item.id==articleId && id==null){
                        html = "";
                        html += '<div class="col-xs-12" data-id="'+article.id+'"><a href="#" class="favourite-icon glyphicon glyphicon-star star-lg" data-saveStatus="'+article.saveStatus+'" onclick="return false"></a><img id="article-img" alt="" src="'+article.img+'"></div>';   
                        html += '<div class="col-xs-12" id="article-theme">Theme: '+(article.themeId=='1'?'Fairytale':(article.themeId=='2'?'Chinese':(article.themeId=='3'?'Romance':(article.themeId=='4'?'Flora':''))))+' | '+article.title+'</div>';  
                        html += '<div id="article-author">'+article.author+'</div>';
                        html += '<div id="article-content">'+article.content+'</div>';
                        $("#article-body #content").append(html);
                        articleNum++;
                    }
                    else{
                        html = "";
                        html += '<div class="row">';
                        html += '<img class="col-xs-12 col-md-2" alt="" src="'+article.img+'">';
                        html += '<div class="col-xs-12 col-md-10" data-id="'+article.id+'">';
                        html += '<a class="recommendation-a" href="service-article.html?articleId='+article.id+'"><b style="color:red;font-weight: bold;">'+article.title+'</b><br/>'+article.content.substring(0,150)+'...</a>';
                        html += '<p>'+article.pDate+' '+article.pTime+'</p>';
                        html += '<p>'+article.view+' views'+'<a href="#" class="favourite-icon glyphicon glyphicon-star star-sm" data-saveStatus="'+article.saveStatus+'" onclick="return false"></a></p></div></div>';                       
                        $("#recommendation").append(html);
                    }
                });

                var allFavouriteIcon = $(".glyphicon-star");
                $.each(allFavouriteIcon, function (i, item) { 
                    if($(item).attr('data-saveStatus')=='1'){
                        $(item).css('color', 'rgb(255, 106, 106)');
                    }
                    else if($(item).attr('data-saveStatus')=='0'){
                        $(item).css('color', 'white');
                    }
                });

                articleId = '';
                $(".glyphicon-star").click(function(e){
                    if($(this).attr("class").indexOf('star-lg')>0){
                        articleId = $(this).parent().attr("data-id");
                        var article = articleList[parseInt(articleId)-1];
                    }
                    else{
                        articleId = $(this).parent().parent().attr("data-id");
                    }
                    if($(this).attr('data-saveStatus')=='0'){
                        $(this).css('color', 'rgb(255, 106, 106)');
                        $(this).attr('data-saveStatus','1');
                        var article = articleList[parseInt(articleId)-1];
                        saveArticleList.push(article);
                    }
                    else{
                        $(this).css('color', 'white');
                        $(this).attr('data-saveStatus','0');
                        var newSaveArticleList = [];
                        $.each(saveArticleList, function (i, item) {
                            if(!(item.id==articleId)){
                                newSaveArticleList.push(item);
                            }                             
                        });
                        saveArticleList = newSaveArticleList;
                    }
                    //local storage to store favourite article in json format
                    //Each time click the icon, resave the article list
                    localStorage.setItem("articleList",JSON.stringify(saveArticleList));
                    // console.log(localStorage.getItem("articleList"));
                });

                $("#notificationBtn").click(function (e) { 
                    e.preventDefault();
                    showNotification();
                    
                });

            }
        });

        $("#share").share();

    }

    //Review Page
    var objList = []; //Store all comments
    var bookmarkList = [];
    if(pathname.indexOf("review.html")>0){
        //Review - Mansory Layout
        document.querySelector('#sortable').sortablejs();
        //Review - Get all comments stored in json file
        $.ajax({
            type: "GET",
            url: "data/comments.json",
            data: "data",
            dataType: "json",
            success: function (response) {
                var allBookmark = [];
                allBookmark = JSON.parse(sessionStorage.getItem("bookmarkList"));
                allBookmark = allBookmark==null?[]:allBookmark;
                bookmarkList = allBookmark;

                var allComment = [];
                var allComment = JSON.parse(localStorage.getItem("commentList"));
                allComment = allComment==null?[]:allComment;

                //Simulate add review
                for(var i=response.length;allComment.length>response.length;i++){
                    response.push(allComment[i]);
                }
                console.log(allComment);
                console.log(response);

                //response = comments data
                $.each(response, function (i, item) {
                    var obj = new Object(); //Each comment stored in the json object

                    obj.id=item.id;
                    obj.type=item.type;
                    obj.img=item.img;
                    obj.title=item.title;
                    obj.text=item.text;

                    obj.bookmark = '0';
                    $.each(allBookmark, function (i, item) { 
                        if(item.id==obj.id){
                            obj.bookmark = '1';
                        }                         
                    });

                    objList.push(obj);

                    var html = "";
                    html += '<div data-sjsel="'+obj.type+'" data-id="'+obj.id+'">';
                    html += '<a class="favourite-icon glyphicon glyphicon-heart" data-status="'+obj.bookmark+'"></a>';
                    html += '<a class="card thumbnail"><img class="card__picture" style="position:relative" src="'+obj.img+'" alt=""/>';
                    html += '<div class="card-infos"><h2 class="card__title">'+obj.title+'</h2>';
                    html += '<p class="card__text">' + obj.text + '</p></div></a></div>';
                    $(html).appendTo("#sortable");
                    document.querySelector('#sortable').sortablejs();
                });

                var jsonObj = JSON.stringify(objList);
                localStorage.setItem("commentList",jsonObj);

                //Bookmark
                showBookmark(bookmarkList);

                var allFavouriteIcon = $(".favourite-icon");
                $.each(allFavouriteIcon, function (i, item) { 
                    if($(item).attr('data-status')=='1'){
                        $(item).css('color', 'rgb(255, 106, 106)');
                    }
                    else if($(item).attr('data-status')=='0'){
                        $(item).css('color', 'white');
                    }
                });

                $(".card").click(function (e) { 
                    var comment_id = $(this).parent().attr("data-id");
                });
            
                $(".glyphicon-heart").click(function (e) { 
                    var comment_id = $(this).parent().attr("data-id");
            
                    btnStatus = ($(this).attr('data-status')=='1')?true:false;
                    console.log(btnStatus);
                    if(btnStatus){
                        $(this).css('color', 'white');
                        $(this).attr('data-status','0');
                        objList[parseInt(comment_id)-1].bookmark='0';

                        //Resave bookmark list
                        var newBookmarkList = [];
                        $.each(bookmarkList, function (i, item) {
                            if(!(item.id==comment_id)){
                                newBookmarkList.push(item);
                            }                         
                        });
                        bookmarkList = newBookmarkList;
                    }
                    else{
                        $(this).css('color', 'rgb(255, 106, 106)');
                        $(this).attr('data-status','1');
                        objList[parseInt(comment_id)-1].bookmark='1';

                        //Save to session
                        var obj = objList[parseInt(comment_id)-1];
                        bookmarkList.push(obj);
                    }

                    //session storage to store favourite review in json format
                    //Each time click the icon, resave the bookmark list
                    sessionStorage.setItem("bookmarkList",JSON.stringify(bookmarkList));
                    var bookmark = JSON.parse(sessionStorage.getItem("bookmarkList"));
                    bookmark = bookmark==null?[]:bookmark;
                    showBookmark(bookmark);
                });

                //Add new post
                var imgUrl;
                $("#reviewPhoto").on("change",function(e){
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(arg) {
                        imgUrl = arg.target.result;
                    }
                });
                $("#reviewForm").submit(function (e) {
                    var reviewTitle = $("#reviewTitle").val();
                    var reviewContent = $("#reviewContent").val();

                    //Validate review title
                    if(!(validateEmptyInput(reviewTitle))){
                        e.preventDefault();
                        $("#reviewTitle").attr("placeholder","Your review title cannot be empty!");

                        $("#reviewTitle").parent().addClass("has-error");
                    }
                    else{
                        $("#reviewTitle").attr("placeholder","");
                        $("#reviewTitle").parent().removeClass("has-error");
                    }    
                    
                    //Validate review content
                    if(!(validateEmptyInput(reviewContent))){
                        e.preventDefault();
                        $("#reviewContent").attr("placeholder","Your review content cannot be empty!");

                        $("#reviewContent").parent().addClass("has-error");
                    }
                    else{
                        $("#reviewContent").attr("placeholder","");
                        $("#reviewContent").parent().removeClass("has-error");
                    }         

                    var flag;
                    flag = validateEmptyInput(reviewTitle) && validateEmptyInput(reviewContent) && validateEmptyInput(imgUrl);
                    if(flag){
                        var obj = new Object();

                        obj.id=objList.length+1;
                        obj.type=$("#selectTheme option:selected").val().toLowerCase();
                        obj.img=imgUrl;
                        obj.title= reviewTitle;
                        obj.text= reviewContent;
                        obj.bookmark = '0';
                        console.log(obj);
                        objList.push(obj);
    
                        var html = "";
                        html += '<div data-sjsel="'+obj.type+'" data-id="'+obj.id+'">';
                        html += '<a class="favourite-icon glyphicon glyphicon-heart" data-status="'+obj.bookmark+'"></a>';
                        html += '<a class="card thumbnail"><img class="card__picture" style="position:relative" src="'+obj.img+'" alt=""/>';
                        html += '<div class="card-infos"><h2 class="card__title">'+obj.title+'</h2>';
                        html += '<p class="card__text">' + obj.text + '</p></div></a></div>';
                        $(html).appendTo("#sortable");
                        document.querySelector('#sortable').sortablejs();
    
                        var jsonObj = JSON.stringify(objList);
                        localStorage.setItem("commentList",jsonObj);

                        $("#myModal").modal('hide');
                    }
                });
            }
        });
    }
});

//Get URL properties' value
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}

//Validate no empty input
function validateEmptyInput(input){
    var reg = /^.+$/; 
    var flag = reg.test(input);
    return flag;
}

//Validate email address format
function validateEmailAdd(e){
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var flag = reg.test(e);
    return flag;
}

//getCookie
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";    
}

Date.prototype.format = function(fmt) { 
    var o = { 
    "M+" : this.getMonth()+1,                 
    "d+" : this.getDate(),                    
    "h+" : this.getHours(),                   
    "m+" : this.getMinutes(),                 
    "s+" : this.getSeconds(),                 
    "q+" : Math.floor((this.getMonth()+3)/3), 
    "S" : this.getMilliseconds()             
    }; 
    if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
    }
    return fmt; 
}

function fixIntegers(integer)
{
    if (integer < 0)
        integer = 0;
    if (integer < 10)
        return "0" + integer;
    return "" + integer;
}

function showBookmark(bookmark){                    
    //Empty current bookmark list
    $("[data-sjsel='bookmark']").remove();
    //Get bookmark from session
    $.each(bookmark, function (i, obj) {                   
        var html = "";
        html += '<div data-sjsel="bookmark" data-id="'+obj.id+'">';
        html += '<a class="card thumbnail"><img class="card__picture" style="position:relative" src="'+obj.img+'" alt=""/>';
        html += '<div class="card-infos"><h2 class="card__title">'+obj.title+'</h2>';
        html += '<p class="card__text">' + obj.text + '</p></div></a></div>';
        $(html).appendTo("#sortable");
        
        document.querySelector('#sortable').sortablejs();
    });
}

//show Notification - article
function showNotification(){ 
    //Web Notification
    if(!('Notification' in window)){
        console.log("This browser does not support notification!");
    }
    else{
        Notification.requestPermission(status => {
            var randomId = Math.floor(Math.random()*5);
                var option={
                    title: "Today's Recommendation",
                    description: '<p style="font-weight:bold;">Click OPEN to open the article '+randomId+'!</p>',
                    type: 'success',
                    closeTimeout: 5000,
                    closeWith: ['click', 'button'],
                    animation: {
                        open: 'slide-in',
                        close: 'slide-out'
                    },
                    buttons: {
                        action:{
                            text:'OPEN',
                            callback:function(){
                                window.location.href='service-article.html?id='+randomId;                                
                            }
                        },
                        cancel: {
                            text:'CLOSE',
                            callback:function(){

                            }
                        }
                    },
                    showButtons:true,
                    animationDuration: .2,
                    position: 'bottom-right',      
                };
                GrowlNotification.notify(option);
        });
    }  
}