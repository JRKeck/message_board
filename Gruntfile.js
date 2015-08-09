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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.registerTask('default', ['compass', 'uglify','copy']);
};
