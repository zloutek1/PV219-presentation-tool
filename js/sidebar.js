
$(() => {
    if ('dark' in getUrlVars()) {
        $('body').addClass('dark');
    }

    $('.button.present').on('click', () => {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
                Element.ALLOW_KEYBOARD_INPUT);
        }
    });

    $('.button.darktoggle').on('click', () => {
        $('body').toggleClass('dark');
        $('.darktoggle i').toggleClass('fa-moon fa-sun');
        toggleUrlVar('dark', true);
    });

    $('.button.add-text').on('click', () => {
        addTextArea($('.slide-content#current .slide'));
    });

    addTextArea($('.slide-content#current .slide'));
});
