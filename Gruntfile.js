module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    line_comments: false,
                    sassDir: 'client/styles',
                    cssDir: 'server/public/assets/styles'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build1: {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js',
            },
            build2: {
                src: 'client/scripts/secret.js',
                dest: 'server/public/assets/scripts/secret.min.js'
            }
        },
        copy: {
            jquery: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map",
                    "bootstrap/dist/css/bootstrap.min.css"
                ],
                "dest": "server/public/vendors/"
            },
            moment: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "moment/moment.js"
                ],
                "dest": "server/public/vendors/"
            },
            fontawesome: {
                expand: true,
                cwd: 'node_modules',
                src: [
                    "font-awesome/fonts/FontAwesome.otf",
                    "font-awesome/fonts/fontawesome-webfont.eot",
                    "font-awesome/fonts/fontawesome-webfont.svg",
                    "font-awesome/fonts/fontawesome-webfont.ttf",
                    "font-awesome/fonts/fontawesome-webfont.woff",
                    "font-awesome/fonts/fontawesome-webfont.woff2",
                    "font-awesome/css/font-awesome.min.css",
                    "font-awesome/css/font-awesome.css.map"
                ],
                "dest": "server/public/vendors/"
            },
            images: {
                expand: true,
                cwd: 'client',
                src: [
                    "imgs/*.*"
                ],
                "dest": "server/public/assets/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', ['compass', 'uglify','copy']);
};
