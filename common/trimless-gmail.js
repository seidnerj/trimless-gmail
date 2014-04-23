untrimTimer = new (function() {
    this.again = 0;
    this.isTicking = false;

    this.more = function() {
        if (!isEnabled) {
            ununtrim();
            return;
        }
        if (untrimTimer.again < 4) {
            ++untrimTimer.again;
        }
        if (!untrimTimer.isTicking) {
            untrimTimer.again = 2;
            untrimTimer.isTicking = true;
            untrimTimer.stuff();
        }
    }

    this.stuff = function() {
        if (!isEnabled) {
            ununtrim();
            untrimTimer.again = 0;
            untrimTimer.isTicking = false;
            return;
        }
        if (untrimTimer.again) {
            --untrimTimer.again;
            window.setTimeout(untrimTimer.stuff, 1000);
        }
        else {
            untrimTimer.isTicking = false;
        }
        untrim();
    }
})();

function untrim() {
    var ad = function(what) {
        var tmpad = $(this);
        if (!tmpad.text().trim().length) {
            tmpad.hide().removeClass(what).addClass('trimless-' + what);
        }
    };

    $('.vem').each(function() {
        var tmpvem = $(this);
        $.get(tmpvem.attr('href'), function(data) {
            tmpvem.parent().html($('font[size=-1]', data).last().html());
        });
    });
    applyOptions();
    $('.adP').removeClass('adP').addClass('trimless-adP');
    $('.adO').removeClass('adO').addClass('trimless-adO');
    $('.adL > .im, .adL.im').add(
            $('.h5').removeClass('h5').addClass('im').addClass('trimless-h5')
        ).addClass('trimless-content');
    $('.ajU, .ajV, .adm').hide().addClass('trimless-button');
    $('.adL').each(function() { ad('adL'); });
    $('.adM').each(function() { ad('adM'); });
    $('.et .aH1').click();
    $('.editable:not(.trimless-br)').prepend('<br />').addClass('trimless-br');
}

function ununtrim() {
    var ad = function(what) {
        var tmpad = $(this);
        if (!tmpad.text().trim().length) {
            tmpad.removeClass('trimless-' + what).addClass(what).show();
        }
    }

    $('.trimless-adM').each(function() { ad('adM'); });
    $('.trimless-adL').each(function() { ad('adL'); });
    $('.trimless-button').removeClass('trimless-button').show();
    $('.trimless-content').removeClass('trimless-content');
    $('.trimless-h5').removeClass('trimless-h5')
        .removeClass('im').addClass('h5');
    $('.trimless-adO').removeClass('trimless-adO').addClass('adO');
    $('.trimless-adP').removeClass('trimless-adP').addClass('adP');
}

function untrimOnClick(event) {
    if (isEnabled) {
        if (!$(event.target).is('.aH1')) {
            untrimTimer.more();
        }
    }
}

function applyOptionsInterface(options) {
    if (!document.getElementById('trimless-style')) {
        $('head').append('<style id=\'trimless-style\'></style>');
    }

    var trimlessStyle = '';

    if (options['trimless-color-enabled']) {
        trimlessStyle +=
            '.trimless-content, .trimless-content * {' +
                'color: ' + options['trimless-color-value'] + 
                    ' !important;' +
                'border-color: ' + options['trimless-color-border'] +
                    ' !important;' +
            '}';
    }

    if (options['trimless-indentation-enabled']) {
        trimlessStyle +=
            '.trimless-content {' +
                'padding-left: ' + options['trimless-indentation-value'] + 
                    'px !important;' +
            '}';
    }

    $('#trimless-style').html(trimlessStyle);
}

untrimTimer.more();
$(window).bind('hashchange', untrimTimer.more);
$(document).click(untrimOnClick);
$(window).load(untrimTimer.more);
$(applyOptions);