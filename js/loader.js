var loadingSpeed = 2;

document.onreadystatechange =
    function(e) {
    if (document.readyState == 'interactive') {
        var all = document.getElementsByTagName('*');
        for (var i = 0, max = all.length * loadingSpeed; i < max; i++) {
            check_element(all[i]);
        }
    }
}

function check_element(ele) {
    var all = document.getElementsByTagName('*');
    var totalele = all.length;
    var per_inc = 100 / (all.length * loadingSpeed);

    if ($(ele).on()) {
        var prog_width = per_inc + Number($('#progress_width').val());
        $('#progress_width').val(prog_width);
        $('.loaded').animate({width: 100 - prog_width + '%'}, 10, function() {
            $('.percentage').text(Math.round(prog_width));
            if (Math.round(prog_width) >= 100) {
                $('.loader').fadeOut('slow');
            }
        });
    }

    else {
        set_ele(ele);
    }
}
