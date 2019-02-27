var running = false;
var paused = false;
var progress = 0;
var index = 0;
var total = 0;
var requests = [];

var subreddits = [];

var delay = 1000; // ms

setState('Parado');

function generate() {
    if (!running) {
        reset();
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

                var subreddit = [];
                subreddit[0] = json.name;
                subreddit[1] = json.subscribers;
                subreddit[2] = json.description;
                subreddits.push(subreddit);

                updateTable(json.name, json.subscribers, json.description);
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

    for (var i = progress; i < requests.length; i++) {
        if (paused) {
            $('#pause-button').html('Continuar');
            requests[i].pause();
            
        } else {
            $('#pause-button').html('Pausar');
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

function copyMarkdown() {
    var txt = '';
    subreddits.forEach(function(subreddit) {
        txt += ' ' + subreddit[0] + ' | ' + subreddit[1] + ' | ' + subreddit[2] + ' \n';
    });
    navigator.clipboard.writeText(txt);
    $('.notification').slideDown('fast');
    window.setTimeout(closeNotification,3000);
}

function closeNotification() {
    $('.notification').slideUp('fast');
  }

function reset() {
    if (!running) {
        progress = 0;
        index = 0;
        total = 0;
        requests = [];
        setState('Parado');
        resetTable();
        $('#progress-bar').css('width', 0);
        $('#clear-button').css('display', 'none');
        $('#markdown-button').css('display', 'none');
    }
}

function updatePanel() {
    if (running) {
        $('#clear-button').css('display', 'none');
        $('#generate-button').css('display', 'none');
        $('#markdown-button').css('display', 'none');
        $('#pause-button').css('display', 'block');
    } else {
        $('#clear-button').css('display', 'block');
        $('#generate-button').css('display', 'block');
        $('#markdown-button').css('display', 'block');
        $('#pause-button').css('display', 'none');
    }
}

function setState(state) {
    $("#status").html('Estado: <b>' + state +'</b>');
}

function setProgress(progress) {
    $("#status").html('Progresso: <b>' + progress +'</b>');
}

function resetTable() {
    $('#table tbody').html('');
}

function updateTable(name, subscribers, description) {
    $('#table tbody').prepend('<tr><td>' + name + '</td><td>' + subscribers + '</td><td>' + description + '</td></tr>');
    if (progress % 2 == 0) {
        $('table tbody tr:nth-child(even)').css('background-color', '#dddddd');
        $('table tbody tr:nth-child(odd)').css('background-color', '#f8f8f8');
    } else {
        $('table tbody tr:nth-child(even)').css('background-color', '#f8f8f8');
        $('table tbody tr:nth-child(odd)').css('background-color', '#dddddd');
    }
    
}