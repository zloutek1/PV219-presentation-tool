function getSlideAbove(slide) {
    return slide.parent()
        .prev('.collection')
        .children('.slide-content')
        .eq(slide.index())
}

function hasSlideAbove(slide) {
    return getSlideAbove(slide).length != 0
}

function getSlideUnder(slide) {
    return slide.parent()
        .next('.collection')
        .children('.slide-content')
        .eq(slide.index())
}

function hasSlideUnder(slide) {
    return getSlideUnder(slide).length != 0
}

function getSlideLeft(slide) {
    return slide.prev('.slide-content');
}

function hasSlideLeft(slide) {
    return getSlideLeft(slide).length != 0
}

function getSlideRight(slide) {
    return slide.next('.slide-content');
}

function hasSlideRight(slide) {
    return getSlideRight(slide).length != 0
}

function updateArrowVisibility() {
    let currentSlide = $('.slide-content#current');

    if (hasSlideAbove(currentSlide)) {
        $('.arrows .arrow.up').show();
    } else {
        $('.arrows .arrow.up').hide();
    }

    if (hasSlideUnder(currentSlide)) {
        $('.arrows .arrow.down').show();
    } else {
        $('.arrows .arrow.down').hide();
    }

    if (hasSlideLeft(currentSlide)) {
        $('.arrows .arrow.left').show();
    } else {
        $('.arrows .arrow.left').hide();
    }

    if (hasSlideRight(currentSlide)) {
        $('.arrows .arrow.right').show();
    } else {
        $('.arrows .arrow.right').hide();
    }
}

function arrowPressed(e) {
    let currentSlide = $('.slide-content#current');

    let scrollTo = undefined;
    if (hasSlideAbove(currentSlide) &&
        ($(this).hasClass('up') || e.keyCode == 38)) {
        getSlideAbove(currentSlide).attr('id', 'current');

        let to = $(document).scrollTop() - currentSlide.parent().height();
        scrollTo = {scrollTop: to};
    } else if (hasSlideUnder(currentSlide) &&
        ($(this).hasClass('down') || e.keyCode == 40)) {
        getSlideUnder(currentSlide).attr('id', 'current');

        let to = $(document).scrollTop() + currentSlide.parent().height();
        scrollTo = {scrollTop: to};
    } else if (hasSlideLeft(currentSlide) &&
        ($(this).hasClass('left') || e.keyCode == 37)) {
        getSlideLeft(currentSlide).attr('id', 'current');

        let to = $(document).scrollLeft() - currentSlide.width();
        scrollTo = {scrollLeft: to};
    } else if (hasSlideRight(currentSlide) &&
        ($(this).hasClass('right') || e.keyCode == 39)) {
        getSlideRight(currentSlide).attr('id', 'current');

        let to = $(document).scrollLeft() + currentSlide.width()
        scrollTo = {scrollLeft: to};
    }

    if (scrollTo != undefined) {
        $('.arrows .arrow').off('click');
        $(document).off('.arrowPress');
        currentSlide.attr('id', '');

        $('html, body').animate(scrollTo, 500, 'linear', () => {
            $('.arrows .arrow').off('.arrowPress');
            $('.arrows .arrow').on('click.arrowPress', arrowPressed);
            $(document).off('.arrowPress');
            $(document).on('keydown.arrowPress', arrowPressed);
            updateArrowVisibility();

            setUrlVar('row',
                $('.slide-content#current').parent().index('.collection'));
            setUrlVar('col', $('.slide-content#current').index());
        });
    }
}

function scrollToCurrentSlide() {
    let hashes = getUrlVars();
    let row = hashes['row'] == undefined ? 0 : hashes['row'];
    let col = hashes['col'] == undefined ? 0 : hashes['col'];

    let currentSlide = $('.content')
                           .children('.collection')
                           .eq(row)
                           .children('.slide-content')
                           .eq(col);

    $('.slide-content#current').attr('id', '');
    currentSlide.attr('id', 'current');

    $('html, body')
        .animate({
            scrollTop: currentSlide.offset().top,
            scrollLeft: currentSlide.offset().left - $(window).width() / 100 * 5
        },
            100, 'linear', () => {
                updateArrowVisibility();
            });
}

$(() => {
    updateArrowVisibility();
    scrollToCurrentSlide();

    $('.arrows .arrow').on('click.arrowPress', arrowPressed);
    $(document).on('keydown.arrowPress', arrowPressed);

    $(window).on('resize', function(event) {
        scrollToCurrentSlide();
    });
});
