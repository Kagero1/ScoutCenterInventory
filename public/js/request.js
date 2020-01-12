$(document).ready(()=>{
    $("#ritems").addClass('active')
    $("#invent").removeClass('active')
    $("#home").removeClass('active')
    $("#rstatus").removeClass('active')
    $("#mitems").removeClass('active')

    $("#requestUser").DataTable({
        filter: true,
        scrollCollapse: true,
        language: {
            searchPlaceholder: "Search Items"
        }
    });
})