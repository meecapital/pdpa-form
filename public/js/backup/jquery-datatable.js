$(function () {
    $('.js-basic-example').DataTable({
        responsive: true
    });

    //Exportable table
    $('.js-exportable').DataTable({
        dom: 'Bfrtip',
        responsive: true,
        buttons : [
            'copy',/*'csv' ,*/'excel', 'pdf', 'print'
        ]
    });

    $("a.dt-button").addClass("btn btn-info btn-sm mr-1");

});

