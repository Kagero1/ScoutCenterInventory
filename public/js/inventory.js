$(document).ready(() => {
    $("#invent").addClass('active')
    $("#home").removeClass('active')
    $("#ritems").removeClass('active')
    $("#rstatus").removeClass('active')

    $("#inventory").DataTable({
        filter: true,
        scrollCollapse: true,
        language: {
            searchPlaceholder: "Search Inventory"
        },
        scrollY: 300,
        scroller: true
    });
    var today = new Date().toLocaleString("en-PH", {timeZone: "Asia/Manila"}).split(",");

    var datearray = today[0].split("/");
    var newdate = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
    var time = today[1].substring(0, today[1].length-1).substring(1);
    var newTime;
    if(time.includes("am")){
        var temp = time.split(":");
        newTime = "0" + temp[0] + temp[1] + temp[2].substring(0, temp[2].length-2);
    }else if(time.includes("pm")){
        newTime = time.substring(0, time.length-2);
    }

    var ttoday = newdate + "T" + newTime;
    document.getElementById("dateField").setAttribute('min', ttoday);

    console.log(ttoday);

    $(".btn-request").on('click', function(){
        var id = $(this).attr("data-id");
        var date = new Date( $("#dateField").val());
        console.log(date);
        if($("#qtyField").val() > 0 
            && date.getDate() > 0 
            && date.getMonth() + 1 > 0 
            && date.getFullYear() > 0){
            console.log("Quantity: " + $("#qtyField").val() 
            + "\nYear: " + date.getFullYear()
            + "\nMonth: " + date.getMonth() + 1
            + "\nDay: " + date.getDate());
            
            if($("#qtyField").val() > 0 && $("#qtyField").val() < $("#currentField").val()){
                var item={}

                item.category

                $.ajax({
                    url: "borrow",
                    method: "POST",
                    data:{
                        id : id,
                        date : date,
                        qty : $("#qtyField").val()
                    },
                    success: function(result){

                    }
                })
            }else{

            }
            
        }else{
            if($(".editError").length == 0){
                $(".errorMessage").append("<label class='editError' style='color: red;'>Please fill up empty fields.</label>");
            }else{
                $(".editError").remove();
                $(".errorMessage").append("<label class='editError' style='color: red;'>Fields cannot be empty.</label>");
            }
        }
        
    })
});