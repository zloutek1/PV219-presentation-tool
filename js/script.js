$(window).on('resize', function(event) {
    var maxHeight = window.screen.height, maxWidth = window.screen.width,
        curHeight = window.innerHeight, curWidth = window.innerWidth;

    if (maxHeight == curHeight) {
        // entered fullscreen mode
        $('body').addClass('fullscreen');
        $('.editor').prop('contentEditable', false);
    } else {
        // exited fullscreen mode
        $('body').removeClass('fullscreen');
        $('.editor').prop('contentEditable', true);
    }
});

$(() => {
    if ('dark' in getUrlVars()) {
        $('body').addClass('dark');
    }
});
