var running = false;
var paused = false;
var progress = 0;
var index = 0;
var total = 0;
var requests = [];

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
    requests.push(new Timer(function() {
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
                setTextArea(json.subscribers + '|' + json.name + '|' + json.description + "\n" + getTextArea());
                updateProgress();
            }
        });
    }, delay * index));
}

function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

function pause() {
    paused = !paused;

    if (paused) {
        $('#pause-button').html('Continuar');
        for (var i = progress; i < requests.length; i++) {
            requests[i].pause();
        }
    } else {
        $('#pause-button').html('Pausar');
        for (var i = progress; i < requests.length; i++) {
            requests[i].resume();
        }
    }
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
        requests = [];
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
