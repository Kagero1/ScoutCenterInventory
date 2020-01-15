var troopNo
$(document).ready(() => {
    $("#invent").addClass('active')
    $("#home").removeClass('active')
    $("#ritems").removeClass('active')
    $("#rstatus").removeClass('active')

    troopNo = $("troopField").val();
    console.log(troopNo + " " + $("troopField").val());

    //This bit of code activates the datatable functionality of bootstrap.
    //Activates pagination, filter, and search function of the table
    //Also puts a limit to the number of entries per page and puts a page scroll
    $("#inventory").DataTable({
        filter: true,
        scrollCollapse: true,
        language: {
            searchPlaceholder: "Search Inventory"
        },
        scrollY: 300,
        scroller: true
    });

    //This part fixes all Date issues (Date Blocking and Time Blocking + Time Format)
    //Adds necessary 0s and spaces in order for the blocking to work as intended
    //Bases the time format at the en-PH timezone at UTC+8
    var today = new Date().toLocaleString("en-PH", {timeZone: "Asia/Manila"}).split(",");
    var datearray = today[0].split("/");
    var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
    var newDate = datearray[1] + '/' + datearray[0] + '/' + datearray[2] + " ";
    var time = today[1].substring(1);
    console.log(time);
    var newTime;

    if(time.includes("am")){
        var temp = time.split(":");
        newTime = "0" + temp[0] + ":" +  temp[1];
        console.log(newTime);
    }else if(time.includes("pm")){
        var temp = time.split(":");
        newTime = (parseInt(temp[0]) + 12).toString() + ":" + temp[1];
        console.log(newTime);
    }

    var ttoday = newdate + "T" + newTime;
    document.getElementById("dateField").setAttribute('min', ttoday);

    console.log(ttoday);
    //End of Date Fixes

    //This part checks all fields if they are appropriately filled out and creates and updates entries accordingly
    //This also displays errors in the front end adequately but NOT YET appropriately (NEEDS FIXING) [i.e. Tell users what are the mistakes]
    $(".btn-request").on('click', function(){
        var id = $(this).attr("data-id");
        var date = new Date( $("#dateField").val());
        console.log(date);

        console.log(new Date(newDate + newTime));
    
        if($("#qtyField").val() > 0 
            && date.getDate() > 0 
            && date.getMonth() + 1 > 0 
            && date.getFullYear() > 0
            && $("#reasonField").val().replace(/\s/g,'') != ""){
            
            if(date > new Date(newDate + newTime)){
                $(".editError").remove();
                if($("#qtyField").val() > 0 && $("#qtyField").val() <= $("#currentField").val()){
                    var item={}

                    item.category = $("#categoryField").val();
                    item.currentQty = (parseInt($("#currentField").val()) - parseInt($("#qtyField").val())).toString();
                    item.totQty = $("#totQty").val();
                    item.borrowQty = parseInt($("#qtyField").val()).toString();
                    item.dateBorrow = newDate + newTime;
                    item.reason = $("#reasonField").val();
                    item.uname = id;
                    console.log("Item." + troopNo);
                    item.troopNo = troopNo;

                    $.ajax({
                        url: "borrow",
                        method: "POST",
                        data:{
                            item : item,
                            name : $("#nameField").val()
                        },
                        success: function(result){
                            if(result == "OK"){
                                window.location = "/inventory"
                            }else{
                                if($(".editError").length == 0){
                                    $(".errorMessage").append("<label class='editError' style='color: red;'>Something went wrong while procesing your request. Please Try Again</label>");
                                }else{
                                    $(".editError").remove();
                                    $(".errorMessage").append("<label class='editError' style='color: red;'>Something went wrong while procesing your request. Please Try Again</label>");
                                }
                            }
                        }
                    })
                }else{
                    if($(".editError").length == 0){
                        $(".errorMessage").append("<label class='editError' style='color: red;'>The quantity you requested exceeded the current quantity.</label>");
                    }else{
                        $(".editError").remove();
                        $(".errorMessage").append("<label class='editError' style='color: red;'>The Quantity you requested exceeded the current quantity.</label>");
                    }
                }
            }else{
                if($(".editError").length == 0){
                    $(".errorMessage").append("<label class='editError' style='color: red;'>Please enter a valid time and date.</label>");
                }else{
                    $(".editError").remove();
                    $(".errorMessage").append("<label class='editError' style='color: red;'>Please input a date and time later than " + date + "</label>");
                }
            }
            
            
        }else{
            if($(".editError").length == 0){
                $(".errorMessage").append("<label class='editError' style='color: red;'>Fields Cannot be Empty</label>");
            }else{
                $(".editError").remove();
                $(".errorMessage").append("<label class='editError' style='color: red;'>Fields Cannot be Empty</label>");
            }
        }
        //End of Request
    })
});