var idSelected;
var flag;
var curr = 0, name;
function updateStatus(){
    $.ajax({
        url:"updateStatus",
        method:"POST",
        data:{
            name : name,
            currentQty : curr,
            id : idSelected,
            status: flag
        },
        success: function(result){
            if(result == "OK"){
                window.location = "/manageRequest";
            }else{
                alert("Something Went Wrong. Please try again.");
            }
        }
    })
}

$(document).ready(()=>{
    $("#rstatus").removeClass('active')
    $("#invent").removeClass('active')
    $("#ritems").removeClass('active')
    $("#home").removeClass('active')
    $("#mitems").addClass('active')

    var spans = document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++){
        let spanValue = spans[i].textContent;
        console.log("Span Value: " + spanValue);
        console.log(spans[i].getAttribute("data-id"));
        if(spanValue.localeCompare("Pending") == 0){
            spans[i].setAttribute("class", "badge badge-warning");
            $("#option" + spans[i].getAttribute("data-id")).append("<button class='statusAccept btn btn-success' style='width:fit-content; height:fit-content; font-size:10px; text-align:center; display:inline-flex;' id='" + spans[i].getAttribute("data-id") + "'><strong>Accept</strong></button> &emsp;");
            $("#option" + spans[i].getAttribute("data-id")).append("<button class='statusReject btn btn-danger' style='width:fit-content; height:fit-content; font-size:10px; text-align:center; display:inline-flex;' id='" + spans[i].getAttribute("data-id") + "'><strong>Reject</strong></button>");
        }else if(spanValue.localeCompare("Accepted") == 0){
            spans[i].setAttribute("class", "badge badge-success");
        }else if(spanValue.localeCompare("Rejected") == 0){
            spans[i].setAttribute("class", "badge badge-danger");
        }else if(spanValue.localeCompare("Returned") == 0){
            spans[i].setAttribute("class", "badge badge-return");
        }
    }

    $(".statusAccept").click(function(){
        idSelected = this.getAttribute("id");
        flag = "Accepted";
        updateStatus();
    });

    $(".statusReject").click(function(){
        idSelected = this.getAttribute("id");
        curr = (parseInt($("#currentField" + idSelected).val()) + parseInt($("#borrowField" + idSelected).val())).toString();
        name = $("#nameField" + idSelected).val();
        flag = "Rejected";
        updateStatus();
    });

    $("#manageRequest").DataTable({
        filter: true,
        scrollCollapse: true,
        language: {
            searchPlaceholder: "Filter Requests"
        }
    });
});