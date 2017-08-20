var areaconfig  = {"id":"menu002","init_Div":"divorg","DataSource":"AreaRoot","maxChoose":"10","main_ContentType":"s1","mscb":"2","sub_ColumnType":"22","se_SearchLevel":"3","se_TreeLevel":"2","se_ShowDetail":"yes","lightBox":"0","s1TopTitle":"台灣地區","s1BottomTitle":"海外地區","s1NO":"6001000000","choiceNumber":"3"};
var jobconfig   = {"id":"menu001","init_Div":"divorg","DataSource":"JobCatRoot","maxChoose":"5","searchBox":"1","se_AutoSend":"1","mscb":"2","choiceNumber":"2","se_ShowDetail":"yes","lightBox":"0","main_ColumnType":"2","sub_ColumnType":"2"};
var indconfig   = {"id":"menu003","init_Div":"divorg","DataSource":"IndustRoot","maxChoose":"5","searchBox":"1","se_AutoSend":"1","mscb":"2","choiceNumber":"2","se_ShowDetail":"yes","lightBox":"0","main_ColumnType":"2","sub_ColumnType":"2"};

<!--//開啟複選選單-->
function openMenu(config){
    switch(config){
        case 'area':
            if (typeof(_fun_jsonarea) == "undefined"){
                LoadMenuJS(config,'/public/function01/utf8/jsonArea.js');
            }else{openE104Menu2011(areaconfig);}
        break;
        case 'job':
            if (typeof(_fun_jsonJobCat) == "undefined"){
                LoadMenuJS(config,'/public/function01/utf8/jsonJobCat.js');
            }else{openE104Menu2011(jobconfig);}
        break;
        case 'indust':
            if (typeof(_fun_jsonJobCat) == "undefined"){
                LoadMenuJS(config,'/public/function01/utf8/jsonIndust.js');
            }else{openE104Menu2011(indconfig);}
        break;
    }
}

<!--//動態載入JS-->
function LoadMenuJS(strcon,strFile){
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= strFile;
    head.appendChild(script);
    <!--//IE-->
    script.onreadystatechange=function(){
        if(this.readyState == 'loaded' || this.readyState == 'complete'){
            if (strcon == 'area'){openE104Menu2011(areaconfig);}
            if (strcon == 'job'){openE104Menu2011(jobconfig);}
            if (strcon == 'indust'){openE104Menu2011(indconfig);}
        }
    };
    <!--//for其他瀏覽器--->
    script.onload=function(){
        if (strcon == 'area'){openE104Menu2011(areaconfig);}
        if (strcon == 'job'){openE104Menu2011(jobconfig);}
        if (strcon == 'indust'){openE104Menu2011(indconfig);}
    };
}

<!--//Callback function-->
E104Menu2011.prototype.callBack = function(){
    <!--//開始處理使用者選擇項目-->
    var rtn = "";
    if(this.config.id == "menu001"){
        <!--//找工作-職務-->
        var ar_no = Array('sel_main_jobcat','sel_main_jobcat1','sel_main_jobcat2','sel_main_jobcat3','sel_main_jobcat4');
        var ar_na = Array('sel_main_jobcat_name','sel_main_jobcat_name1','sel_main_jobcat_name2','sel_main_jobcat_name3','sel_main_jobcat_name4');

    }
    if(this.config.id == "menu002"){
        <!---//找工作-地區--->
        var ar_no = Array('sel_loc','sel_loc2','sel_loc3','sel_loc4','sel_loc5','sel_loc6','sel_loc7','sel_loc8','sel_loc9','sel_loc10');
        var ar_na = Array('sel_loc_name','sel_loc_name2','sel_loc_name3','sel_loc_name4','sel_loc_name5','sel_loc_name6','sel_loc_name7','sel_loc_name8','sel_loc_name9','sel_loc_name10');
    }

   if(this.config.id == "menu003"){
        <!---//找工作-職務--->
        var ar_no = Array('sel_indcat','sel_indcat2','sel_indcat3','sel_indcat4','sel_indcat5');
        var ar_na = Array('sel_indcat_name','sel_indcat_name2','sel_indcat_name3','sel_indcat_name4','sel_indcat_name5');
        //var ar_div = Array('Indust1','Indust2','Indust3');
    }

    for(var i = 0; i < ar_no.length; i++){
        $('#' + ar_no[i]).val('0');
        $('#' + ar_na[i]).val('');
    }

    if (this.config.chooseItems.length > 0){
        for(var i = 0; i < this.config.chooseItems.length; i++){
            $('#' + ar_no[i]).val(this.config.chooseItems[i].no);
            $('#' + ar_na[i]).val(this.config.chooseItems[i].des);
            if (i > 0){
                rtn += '、' + this.config.chooseItems[i].des;
            }else{
                rtn = this.config.chooseItems[i].des;
            }
            if(this.config.id == "menu001"){
                if (rtn == ''){
                    rtn = '地區';
                    $(".globaljob").css('color','#a3a3a3');
                }else{
                    $(".globaljob").css('color','#333333');
                }
                $(".globaljob").text(rtn);
            }
            if(this.config.id == "menu002"){
                if (rtn == ''){
                    rtn = '地區';
                    $(".globalarea").css('color','#a3a3a3');
                }else{
                    $(".globalarea").css('color','#333333');
                }
                $(".globalarea").text(rtn);
            }
            if(this.config.id == "menu003"){
                if (rtn == ''){
                    rtn = '產業';
                    $(".globalindust").css('color','#a3a3a3');
                }else{
                    $(".globalindust").css('color','#333333');
                }
                $(".globalindust").text(rtn);
            }
        }

    }else{
        if(this.config.id == "menu001"){
            $(".globaljob").css('color','#a3a3a3');
            $('.globaljob').text('職務');
        }
        if(this.config.id == "menu002"){
            $(".globalarea").css('color','#a3a3a3');
            $('.globalarea').text('地區');
        }
        if(this.config.id == "menu003"){
            $(".globalindust").css('color','#a3a3a3');
            $('.globalindust').text('產業');
        }
    }
}

function clearField(tab){
  //tab 參數
  //i, c: 首頁
  //s: 學生 
  //f: 新鮮人 
  //w: 上班族 
  //h: 高階 
    if (tab == 's') {
        var defStr = '職務、科系、學校';
    }else if(tab == 'c'){
        var defStr = '公司名、產品名或品牌名';
    }else{
        var defStr = '關鍵字';
    }

    $('#' + tab + 'keyword').val(defStr);
    $('#' + tab + 'keyword').css('color','#a3a3a3');
    $(".globaljob").css('color','#a3a3a3');
    $('.globaljob').text('職務');
    $(".globalarea").css('color','#a3a3a3');
    $('.globalarea').text('地區');
    $(".globalindust").css('color','#a3a3a3');
    $('.globalindust').text('產業');

    switch (tab){
        case "s":
            $('.sWorkTime').css('color','#a3a3a3');
            $('.sWorkTime').text('時段');
        break;
        case "h":
            $('.hperiod').css('color','#a3a3a3');
            $('.hperiod').text('工作經歷');
        break;
    }

    var arr_area_name = Array('sel_loc_name','sel_loc_name2','sel_loc_name3','sel_loc_name4','sel_loc_name5','sel_loc_name6','sel_loc_name7','sel_loc_name8','sel_loc_name9','sel_loc_name10');
    var arr_area_no   = Array('sel_loc','sel_loc2','sel_loc3','sel_loc4','sel_loc5','sel_loc6','sel_loc7','sel_loc8','sel_loc9','sel_loc10');
    var arr_job_name = Array('sel_main_jobcat_name','sel_main_jobcat_name1','sel_main_jobcat_name2','sel_main_jobcat_name3','sel_main_jobcat_name4');
    var arr_job_no   = Array('sel_main_jobcat','sel_main_jobcat1','sel_main_jobcat2','sel_main_jobcat3','sel_main_jobcat4');
    var arr_filed_0 = Array('s9','real_role','role_range','sel_role','job_addr_no','jobcat', 'indust');
    var arr_filed_null = Array('job_addr_noName','jobcatName','sel_period','key_job','keyword');
    
    var arr_indcat_name = Array('sel_indcat_name','sel_indcat_name2','sel_indcat_name3','sel_indcat_name4','sel_indcat_name5');
    var arr_indcat_no   = Array('sel_indcat','sel_indcat2','sel_indcat3','sel_indcat4','sel_indcat5');


    <!-- //清除表單的值 -->
    for(var x = 0; x < arr_area_no.length; x++){
        $('#' + arr_area_no[x]).val('0');
        $('#' + arr_area_name[x]).val('');
    }
    for(var y = 0; y < arr_job_no.length; y++){
        $('#' + arr_job_name[y]).val('');
        $('#' + arr_job_no[y]).val('0');
    }
    for(var w = 0; w < arr_indcat_no.length; w++){
        $('#' + arr_indcat_name[w]).val('');
        $('#' + arr_indcat_no[w]).val('0');
    }

    for(var z = 1; z < 4; z++){
        $('#addr' + z).val('0');
        $('#addr_name' + z).val('');
        $('#jobcat' + z).val('0');
        $('#indust' + z).val('0');
    }
    for(var k = 0; k < arr_filed_0.length; k++){
        $('#' + arr_filed_0[k]).val('0');
    }
    
    for(var n = 0; n < arr_filed_null.length; n++){
        $('#' + arr_filed_null[n]).val('');
    }
    
    <!--//清除選單內容-->
    areaconfig.chooseItems = [];
    jobconfig.chooseItems  = [];
    indconfig.chooseItems  = [];
}
