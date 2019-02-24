var disabled = true;

function generate() {

    var dataPost = {
        "mode": 0
    };
    var dataString = JSON.stringify(dataPost);

    $.ajax({
        url: 'generator.php',
        data: {
            data: dataString
        },
        type: 'POST',
        success: function(response) {
            $("#table").val(response);
            disabled = true;
        }
    });
    disabled = false;
    getProgress();
}

function getProgress(){
    if (!disabled) {
        $.ajax({
            url: 'progress.php',
            success: function(data) {
                $("#status").text(data);
                    getProgress();
            }
        });
    }
}

function clearTxtarea() {
    $('#table').val('');
}