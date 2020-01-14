$(document).ready(()=>{
    $("#rstatus").addClass('active');
    $("#invent").removeClass('active');
    $("#ritems").removeClass('active');
    $("#home").removeClass('active');
    $("#mitems").removeClass('active');

    var spans = document.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++){
        let spanValue = spans[i].textContent;
        console.log("Span Value: " + spanValue);
        if(spanValue.localeCompare("Pending") == 0){
            spans[i].setAttribute("class", "badge badge-warning");
            // spans[i].addClass("badge-warning");
        }else if(spanValue.localeCompare("Accepted") == 0){
            spans[i].setAttribute("class", "badge badge-success");
            // spans[i].addClass("badge-success");
        }else if(spanValue.localeCompare("Rejected") == 0){
            spans[i].setAttribute("class", "badge badge-danger");
            // spans[i].addClass("badge-danger");
        }
    }

    $("#requestStatus").DataTable({
        filter: true,
        scrollCollapse: true,
        language: {
            searchPlaceholder: "Filter Requests"
        }
    });
});