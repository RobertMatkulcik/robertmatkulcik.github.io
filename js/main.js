jQuery(document).ready(function () {
    var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
        coverLayer = $('.cd-cover-layer');

    /*
     convert a cubic bezier value to a custom mina easing
     http://stackoverflow.com/questions/25265197/how-to-convert-a-cubic-bezier-value-to-a-custom-mina-easing-snap-svg
     */
    var duration = 600,
        epsilon = (1000 / 60 / duration) / 4,
        firstCustomMinaAnimation = bezier(.63, .35, .48, .92, epsilon);

    modalTriggerBts.each(function () {
        initModal($(this));
    });

    function initModal(modalTrigger) {
        var modalTriggerId = modalTrigger.attr('id'),
            modal = $('.cd-modal[data-modal="' + modalTriggerId + '"]'),
            svgCoverLayer = modal.children('.cd-svg-bg'),
            paths = svgCoverLayer.find('path'),
            pathsArray = [];
        //store Snap objects
        pathsArray[0] = Snap('#' + paths.eq(0).attr('id')),
            pathsArray[1] = Snap('#' + paths.eq(1).attr('id')),
            pathsArray[2] = Snap('#' + paths.eq(2).attr('id'));

        //store path 'd' attribute values
        var pathSteps = [];
        pathSteps[0] = svgCoverLayer.data('step1');
        pathSteps[1] = svgCoverLayer.data('step2');
        pathSteps[2] = svgCoverLayer.data('step3');
        pathSteps[3] = svgCoverLayer.data('step4');
        pathSteps[4] = svgCoverLayer.data('step5');
        pathSteps[5] = svgCoverLayer.data('step6');

        //open modal window
        modalTrigger.on('click', function (event) {
            event.preventDefault();
            modal.addClass('modal-is-visible');
            coverLayer.addClass('modal-is-visible');
            animateModal(pathsArray, pathSteps, duration, 'open');
        });

        //close modal window
        modal.on('click', '.modal-close', function (event) {
            event.preventDefault();
            modal.removeClass('modal-is-visible');
            coverLayer.removeClass('modal-is-visible');
            animateModal(pathsArray, pathSteps, duration, 'close');
        });

        $(document).keyup(function(e) {
            if(e.key === "Escape") {
                console.log("escape");
                // write your logic here.
                event.preventDefault();
                modal.removeClass('modal-is-visible');
                coverLayer.removeClass('modal-is-visible');
                animateModal(pathsArray, pathSteps, duration, 'close');
            }
        });
    }

    function animateModal(paths, pathSteps, duration, animationType) {
        var path1 = (animationType == 'open') ? pathSteps[1] : pathSteps[0],
            path2 = (animationType == 'open') ? pathSteps[3] : pathSteps[2],
            path3 = (animationType == 'open') ? pathSteps[5] : pathSteps[4];
        paths[0].animate({'d': path1}, duration, firstCustomMinaAnimation);
        paths[1].animate({'d': path2}, duration, firstCustomMinaAnimation);
        paths[2].animate({'d': path3}, duration, firstCustomMinaAnimation);
    }

    function bezier(x1, y1, x2, y2, epsilon) {
        //https://github.com/arian/cubic-bezier
        var curveX = function (t) {
            var v = 1 - t;
            return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
        };

        var curveY = function (t) {
            var v = 1 - t;
            return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
        };

        var derivativeCurveX = function (t) {
            var v = 1 - t;
            return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
        };

        return function (t) {

            var x = t, t0, t1, t2, x2, d2, i;

            // First try a few iterations of Newton's method -- normally very fast.
            for (t2 = x, i = 0; i < 8; i++) {
                x2 = curveX(t2) - x;
                if (Math.abs(x2) < epsilon) return curveY(t2);
                d2 = derivativeCurveX(t2);
                if (Math.abs(d2) < 1e-6) break;
                t2 = t2 - x2 / d2;
            }

            t0 = 0, t1 = 1, t2 = x;

            if (t2 < t0) return curveY(t0);
            if (t2 > t1) return curveY(t1);

            // Fallback to the bisection method for reliability.
            while (t0 < t1) {
                x2 = curveX(t2);
                if (Math.abs(x2 - x) < epsilon) return curveY(t2);
                if (x > x2) t0 = t2;
                else t1 = t2;
                t2 = (t1 - t0) * .5 + t0;
            }

            // Failure
            return curveY(t2);

        };
    };


    document.querySelector(".left-corner").addEventListener("click", function () {
        var url = "http://colormind.io/api/";
        var data = {
            model: "default"
        };

        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                var palette = JSON.parse(http.responseText).result;
                document.documentElement.style.setProperty('--color1', "rgb("+palette[4][0] + ","+ palette[4][1] +","+ palette[4][2]+")");
                document.documentElement.style.setProperty('--color3', "rgb("+palette[0][0] + ","+ palette[0][1] +","+ palette[0][2]+")");
                document.documentElement.style.setProperty('--color2', "rgb("+palette[2][0] + ","+ palette[2][1] +","+ palette[2][2]+")");

                // --color1: rgb(50,53,64);
                // --color2: rgb(211,84,78);

                // --color1: #353B53;
                // --color2: #6EA785;

                // --color1: rgb(29,46,31);
                // --color2: rgb(155,96,78);
            }
        };

        http.open("POST", url, true);
        http.send(JSON.stringify(data));

    });


    setTimeout(function () {
        $('.loading-container').fadeOut(function () {
            $(this).hide();
        });
    }, 1100);
});