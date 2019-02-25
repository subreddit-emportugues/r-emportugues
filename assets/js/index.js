var running = false;
var paused = false;
var progress = 0;
var index = 0;
var total = 0;

var delay = 1000; // ms

setState('Parado');

function generate() {
    if (!running) {
        clearTextArea();
        running = true;
        updatePanel();

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
                updateProgress();
            }
        });
    }, delay * index);
}

function pause() {
    // TODO: pauses the foreach loop, which creates the table
}

function updateProgress() {
    progress++;

    $('#progress-bar').css('width', ((progress / total) * 800));

    if (progress == total) {
        setState('Finalizado');
        running = false;
        updatePanel();
    } else {
        setProgress(progress + '/' + total + ' (' + ((progress / total) * 100).toFixed(1) + '%)</b>');
    }
}

function clearTextArea() {
    if (!running) {
        progress = 0;
        index = 0;
        total = 0;
        setState('Parado');
        setTextArea('');
        $('#progress-bar').css('width', 0);
    }
}

function updatePanel() {
    if (running) {
        $('#clear-button').css('display', 'none');
        $('#generate-button').css('display', 'none');
        $('#pause-button').css('display', 'block');
    } else {
        $('#clear-button').css('display', 'block');
        $('#generate-button').css('display', 'block');
        $('#pause-button').css('display', 'none');
    }
}

function setState(state) {
    $("#status").html('Estado: <b>' + state +'</b>');
}

function setProgress(progress) {
    $("#status").html('Progresso: <b>' + progress +'</b>');
}

function setTextArea(content) {
    $("#textarea").val(content);
}

function getTextArea() {
    return $("#textarea").val();
}