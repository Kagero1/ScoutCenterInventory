var idSelected;
var curr, name;
function returnItem(){
    var today = new Date().toLocaleString("en-PH", {timeZone: "Asia/Manila"}).split(",");
    var datearray = today[0].split("/");
    var newDate = datearray[1] + '/' + datearray[0] + '/' + datearray[2] + " ";
    var time = today[1].substring(1);
    var newTime;

    if(time.includes("am")){
        var temp = time.split(":");
        newTime = "0" + temp[0] + ":" +  temp[1];
    }else if(time.includes("pm")){
        var temp = time.split(":");
        newTime = (parseInt(temp[0]) + 12).toString() + ":" + temp[1];
    }

    $.ajax({
        url:"return",
        method:"POST",
        data:{
            name : name,
            currentQty : curr,
            id : idSelected,
            dateReturn: newDate + newTime,
            status: "Returned"
        },
        success: function(result){
            if(result == "OK"){
                window.location = "/requestStatus";
            }else{
                alert("Something Went Wrong. Please try again.");
            }
        }
    })
}
$(document).ready(()=>{
    $("#rstatus").addClass('active');
    $("#invent").removeClass('active');
    $("#ritems").removeClass('active');
    $("#home").removeClass('active');
    $("#mitems").removeClass('active');

    var spans = document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++){
        let spanValue = spans[i].textContent;
        if(spanValue.localeCompare("Pending") == 0){
            spans[i].setAttribute("class", "badge badge-warning");
        }else if(spanValue.localeCompare("Accepted") == 0){
            spans[i].setAttribute("class", "badge badge-success");
            $("#option" + spans[i].getAttribute("data-id")).append("<button class='return btn btn-success' style='width:fit-content; height:fit-content; font-size:10px; text-align:center; display:inline-flex;' id='" + spans[i].getAttribute("data-id") + "'><strong>Return Item</strong></button>");
        }else if(spanValue.localeCompare("Rejected") == 0){
            spans[i].setAttribute("class", "badge badge-danger");
        }else if(spanValue.localeCompare("Returned") == 0){
            spans[i].setAttribute("class", "badge badge-return");
        }
    }

    $(".return").click(function(){
        idSelected = this.getAttribute("id");
        curr = (parseInt($("#currentField" + idSelected).val()) + parseInt($("#borrowField" + idSelected).val())).toString();
        name = $("#nameField" + idSelected).val();
        returnItem();
    })

    $("#requestStatus").DataTable({
        filter: true,
        scrollCollapse: true,
        language: {
            searchPlaceholder: "Filter Requests"
        }
    });
});