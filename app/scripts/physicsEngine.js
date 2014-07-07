'use strict';

var app = app || {
    ui: {
        emailModal: {}
    },
    projects: {},
    trivia: {
        mta: {}
    },
    security: {}
};

var gearSvg = '<svg version="1.1" id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="120.1px" height="120.1px" viewBox="0 0 120.1 120.1" style="enable-background:new 0 0 120.1 120.1;" xml:space="preserve" ><style type="text/css"><![CDATA[ .st0{opacity:0.3;fill:#FFFFFF;}.st1{clip-path:url(#SVGID_2_);fill:#8FB7F7;}]]></style><g><defs><path id="SVGID_1_" d="M117.1,65.1c-2.7,31.4-30.4,54.7-61.8,52c-31.4-2.7-54.7-30.4-52-61.8C6,23.9,33.7,0.6,65.1,3.3 C96.6,6,119.9,33.7,117.1,65.1z"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_" style="overflow:visible;"/></clipPath><path class="st1" d="M101,72.4c-6.7,22.5-30.4,35.4-53,28.6c-22.5-6.7-35.3-30.4-28.6-53c6.7-22.5,30.4-35.4,53-28.6 C94.9,26.1,107.8,49.9,101,72.4z"/><polygon class="st1" points="66.6,-13.5 77.3,27.4 116.8,12.6 95.5,49.1 133.9,66.6 93.1,77.3 107.9,116.9 71.4,95.5 53.9,133.9 43.2,93.1 3.6,107.9 25,71.4 -13.5,53.9 27.4,43.2 12.6,3.6 49.1,25 "/></g><path class="st0" d="M117.3,63.1c0-1.4,0-2.8-0.1-4.1L102,52c-0.6-3.2-1.6-6.2-2.9-9.1l5.4-9.2C99.1,29,92.4,26,84.9,25.4 c-19.5-1.7-36.8,13.5-38.5,33.7c-1.7,20.3,12.7,38.1,32.3,39.7c7.5,0.6,14.6-1.2,20.7-4.8l-3.7-10c1.8-2.6,3.2-5.5,4.4-8.5l16.2-4.2 c0.3-1.3,0.6-2.6,0.8-4c0.1-0.7,0.2-1.3,0.2-2c0,0,0-0.1,0-0.1C117.2,64.4,117.2,63.8,117.3,63.1z"/></svg>';

app.ui.physicsEngine = (function() {
	function init() {
		//
        // Mixed Shapes
        //
        Physics({ timestep: 4 }, function (world) {

            var viewWidth = window.innerWidth,
                viewHeight = window.innerHeight,
                minArea = 420 * 820,
                viewArea = viewWidth * viewHeight,
                // bounds of the window
                viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight),
                edgeBounce,
                renderer,
                maxBodiesDesktop = 20,
                maxBodiesMobile = 0,
                widthBreakpoint = 768,
                resizeTimer = null,
                dropInt = null;

            if (viewArea < minArea && viewWidth > widthBreakpoint) {
                viewportBounds = Physics.aabb(0, 0, viewWidth, minArea/viewWidth);
            }

            // create a renderer
            renderer = Physics.renderer('canvas', {
                el: 'fizzx'
                ,width: viewWidth
                ,height: viewHeight
            });

            // add the renderer
            world.add(renderer);
            // render on each step
            world.on('step', function () {
                world.render();
            });

            // constrain objects to these bounds
            edgeBounce = Physics.behavior('edge-collision-detection', {
                aabb: viewportBounds
                ,restitution: 0.2
                ,cof: 0.8
            });

            // resize events
            window.addEventListener('resize', function () {
                if (resizeTimer)
                    clearTimeout(resizeTimer);
                resizeTimer = setTimeout(onResize, 100);
            }, true);

                function onResize() {
                    viewWidth = window.innerWidth;
                    viewHeight = window.innerHeight;
                    viewArea = viewWidth * viewHeight;
                    var currMaxBodies = (viewWidth > widthBreakpoint) ? maxBodiesDesktop : maxBodiesMobile;
                    var currNumBodies = world._bodies.length;

                    renderer.el.width = viewWidth;
                    renderer.el.height = viewHeight;

                    if (viewArea < minArea && viewWidth > widthBreakpoint) {
                        viewportBounds = Physics.aabb(0, 0, viewWidth, minArea/viewWidth);
                    } else {
                        viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
                    }
                    // update the boundaries
                    edgeBounce.setAABB(viewportBounds);

                    if (currNumBodies > currMaxBodies) {
                        for (var i = currNumBodies; i >= currMaxBodies; i--) {
                            world.removeBody(world._bodies[i]);
                        };
                    } else if (currNumBodies < currMaxBodies) {
                        clearInterval( dropInt );
                        startDropInterval();
                    }

                    if (currNumBodies >= currMaxBodies) {
                        for (var i = world._bodies.length - 1; i >= 0; i--) {
                            var body = world._bodies[i];

                            body.treatment = 'dynamic';
                            makeBodyStaticDelay(body);
                        };
                    }
                }

                function makeBodyStaticDelay(body) {
                    setTimeout(function() {
                        body.treatment = 'static';
                    }, 10000)
                }

            var triangle = [
                { x: 0, y: 97 }
                ,{ x: 56, y: 0 } 
                ,{ x:112, y: 97 }
            ];

            var gearBlue = document.querySelector('.gearBlue'),
                gearRed = document.querySelector('.gearRed'),
                gearGreen = document.querySelector('.gearGreen'),
                gearPurple = document.querySelector('.gearPurple'),
                gearYellow = document.querySelector('.gearYellow'),
                triangleGreen = document.querySelector('.triangleGreen'),
                triangleRed = document.querySelector('.triangleRed'),
                triangleBlue = document.querySelector('.triangleBlue'),
                trianglePurple = document.querySelector('.trianglePurple'),
                triangleYellow = document.querySelector('.triangleYellow');

            var gearArray = [ gearYellow ];
            var triangleArray = [ triangleYellow ];

            function random( min, max ){
                return (Math.random() * (max-min) + min)|0
            }

            function dropInBody(){

                var body;

                switch (random(0,2)){

                        // add a circle
                    case 0:
                        body = Physics.body('circle', {
                            x: viewWidth * 0.9
                            ,y: 50
                            ,vx: random(-5, 5)/100
                            ,vy: random(0, 5)/10
                            ,mass: 2
                            ,angle: random( 0, 2 * Math.PI )
                            ,radius: 50
                            ,restitution: 0.3
                            ,styles: {
                                fillStyle: '#268bd2'
                                ,angleIndicator: '#155479'
                            }
                            ,angularVelocity: random(-5, 5)/1000,
                            view:  gearArray[random(0, gearArray.length)]
                        });
                        break;

                        // add a polygon
                    case 1:
                        body = Physics.body('convex-polygon', {
                            vertices: triangle
                            ,x: viewWidth * 0.9
                            ,y: 0
                            ,vx: random(-5, 5)/100
                            ,vy: random(0, 5)/10
                            ,mass: 2
                            ,angle: random( 0, 2 * Math.PI )
                            ,restitution: 0.3
                            ,styles: {
                                fillStyle: '#859900'
                                ,angleIndicator: '#414700'
                            }
                            ,angularVelocity: random(-5, 5)/1000,
                            view: triangleArray[random(0, triangleArray.length)]
                        });
                        break;
                }

                world.add( body );

                setTimeout(function() {
                    body.treatment = 'static';
                }, 10000);
            }

            function startDropInterval() {
                dropInt = setInterval(function(){
                    var currMaxBodies = (viewWidth > widthBreakpoint) ? maxBodiesDesktop : maxBodiesMobile;
                    if ( world._bodies.length > currMaxBodies - 2){
                        clearInterval( dropInt );
                    }
                    dropInBody();
                }, 1000);
            }

            startDropInterval();

            // add some fun interaction
            var attractor = Physics.behavior('attractor', {
                order: 0,
                strength: 0.002
            });

            world.on({
                'interact:poke': function( pos ){
                    attractor.position( pos );
                    world.add( attractor );
                }
                ,'interact:move': function( pos ){
                    attractor.position( pos );
                }
                ,'interact:release': function(){
                    world.remove( attractor );
                }
            });

            // add things to the world
            world.add([
                Physics.behavior('interactive', { el: renderer.el })
                ,Physics.behavior('constant-acceleration')
                ,Physics.behavior('body-impulse-response')
                ,Physics.behavior('body-collision-detection')
                ,Physics.behavior('sweep-prune')
                ,edgeBounce
            ]);

            // subscribe to ticker to advance the simulation
            Physics.util.ticker.on(function( time ) {
                world.step( time );
            });

            // start the ticker
            Physics.util.ticker.start();
        });

	}

	return {
		init: init

	};
})();

window.onload = function() {
	app.ui.physicsEngine.init();
};