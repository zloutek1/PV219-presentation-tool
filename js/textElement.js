
function addTextArea(slide) {
    let original_widths, original_width, original_x, original_y,
        original_mouse_x, original_mouse_y;

    // create text container
    let textElement = jQuery('<div/>', {
        'class': 'textElement',
        'tabindex': '0',
        'style': `
            position: absolute;
            top: 40%;
            left: 10%;
            width: 80%;
            min-height: 1em;
        `
    });

    // create editable field
    let editor = jQuery('<div/>', {
        'class': 'editor',
        'spellcheck': false,
        'contentEditable': true,
        'data-placeholder': 'Text'
    });

    // create anchors for resizing
    let anchors = jQuery('<div/>', {'class': 'anchors'});
    let directions = ['n', 's', 'w', 'e'];
    for (let i in directions) {
        let direction = directions[i];
        const anchor =
            jQuery('<div/>', {'class': 'anchor', 'data-direction': direction});

        anchor.on('mousedown', function(e) {
            e.preventDefault();

            original_width = textElement.width();
            original_height = textElement.height();
            original_x = textElement.position().left;
            original_y = textElement.position().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;

            $(window).on('mousemove.textElement_resize', (e) => {
                resize(e, anchor);
            });
            $(window).on('mouseup', stopResize);
        });

        anchor.appendTo(anchors);
    }

    // create area for dragging the textElement
    let dragArea = jQuery(`
        <svg class="draggable">
            <rect x="0" y="0" width="100%" height="100%" stroke="transparent" fill="transparent" stroke-width="5"/>
        </svg>`);

    dragArea.on('mousedown', function(e) {
        e.preventDefault();

        original_width = textElement.width();
        original_height = textElement.height();
        original_x = textElement.position().left;
        original_y = textElement.position().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;

        $(window).on('mousemove.textElement_move', move);
        $(window).on('mouseup', stopMove);
    });

    let fotmattingButtons = $(`<div class="formatting-header">
        <div class="button bold"><i class="fas fa-bold"></i></div>
        <div class="button italic"><i class="fas fa-italic"></i></div>
        <div class="button underline"><i class="fas fa-underline"></i></div>
    </div>`);

    // append elements to slide
    editor.appendTo(textElement);
    anchors.appendTo(textElement);
    dragArea.appendTo(textElement);
    fotmattingButtons.appendTo(textElement);
    textElement.appendTo(slide);

    function resize(e, anchor) {
        const minimum_size = 20;

        if (anchor.data('direction') == 'e') {
            const width = original_width + (e.pageX - original_mouse_x);
            if (width > minimum_size) {
                textElement.width(width / slide.width() * 100 + '%');
            }
        }
        if (anchor.data('direction') == 'w') {
            const width = original_width - (e.pageX - original_mouse_x);
            const left = original_x + (e.pageX - original_mouse_x);

            if (left > minimum_size) {
                textElement.width(width / slide.width() * 100 + '%');
                textElement.css('left', left / slide.width() * 100 + '%');
            }
        }
        if (anchor.data('direction') == 's') {
            const height = original_x + (e.pageX - original_mouse_x);
            if (height > minimum_size) {
                textElement.height(height / slide.height() * 100 + '%');
            }
        }
        if (anchor.data('direction') == 'n') {
            const height = original_height - (e.pageY - original_mouse_y);
            const top = original_y + (e.pageY - original_mouse_y);

            if (height > minimum_size) {
                textElement.height(height / slide.height() * 100 + '%');
                textElement.css('top', top / slide.height() * 100 + '%');
            }
        }
    }

    function stopResize() {
        $(window).unbind('.textElement_resize');
    }

    function move(e) {
        const left = original_x + (e.pageX - original_mouse_x);
        const top = original_y + (e.pageY - original_mouse_y);

        textElement.css('left', left / slide.width() * 100 + '%');
        textElement.css('top', top / slide.height() * 100 + '%');
    }

    function stopMove() {
        $(window).unbind('.textElement_move')
    }

    /* button toggles */
    $('.formatting-header .button').on('mousedown', (e) => {
        e = e || window.event;
        e.preventDefault();
    });

    $('.formatting-header .button.bold').on('click', (e) => {
        document.execCommand('bold');
    });
    $('.formatting-header .button.italic').on('click', (e) => {
        document.execCommand('italic');
    });
    $('.formatting-header .button.underline').on('click', (e) => {
        document.execCommand('underline');
    });
}
