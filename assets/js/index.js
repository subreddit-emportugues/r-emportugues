var running = false;
var progress = 0;
var index = 0;
var total = 0;

var delay = 1000; // ms

setState('Parado');

function generate() {
    if (!running) {
        clearTextArea();
        running = true;

       setState('Iniciando...');

        $.get('resources/subreddits.txt', function (response) {
            var lines = response.split("\n");
            total = lines.length;

            lines.forEach(function(line) {
                index++;
                visit(line);
            });
        });
    }
}

function visit(line) {
    setTimeout(function() {
        var dataPost = {
            "name": line.replace(/(\r\n|\n|\r)/gm, "")
        };
        var dataString = JSON.stringify(dataPost);
        
        $.ajax({
            url: 'visitor.php',
            data: {
                subreddit: dataString
            },
            type: 'POST',
            success: function(response) {
                var json = jQuery.parseJSON(response);

                setTextArea('| ' + json.subscribers + ' | ' + json.name + ' | ' + json.description + ' |' + "\n" + getTextArea());

                progress++;

                if (progress == total) {
                    setState('Finalizado');
                    running = false;
                } else {
                    setState('Progresso: <b>' + progress + '/' + total + ' (' + ((progress / total) * 100).toFixed(1) + '%)</b>');
                }
            }
        });
    }, delay * index);
}

function clearTextArea() {
    if (!running) {
        progress = 0;
        index = 0;
        total = 0;
        setState('Parado');
        setTextArea('');
    }
}

function setState(state) {
    $("#status").html('Estado: <b>' + state +'</b>');
}

function setTextArea(content) {
    $("#textarea").val(content);
}

function getTextArea() {
    return $("#textarea").val();
}