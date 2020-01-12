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

    $(".btn-request").on('click', function(){
        var id = $(this).attr("data-id");
        var date = new Date( $("#dateField").val());
        console.log(date);

        console.log(new Date(newDate + newTime));
        
        if($("#qtyField").val() > 0 
            && date.getDate() > 0 
            && date.getMonth() + 1 > 0 
            && date.getFullYear() > 0
            && date > new Date(newDate + newTime)){
            console.log("Quantity: " + $("#qtyField").val() 
            + "\nYear: " + date.getFullYear()
            + "\nMonth: " + date.getMonth() + 1
            + "\nDay: " + date.getDate());

            $(".editError").remove();
            
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
                $(".errorMessage").append("<label class='editError' style='color: red;'>Please input valid values.</label>");
            }else{
                $(".editError").remove();
                $(".errorMessage").append("<label class='editError' style='color: red;'>Please double check your inputs.</label>");
            }
        }
        
    })
});