/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: port,
					keepalive:true,
					base: '.',
					hostname : '0.0.0.0',     
  			middleware: function(connect, options){
           return [
             connect.static(options.base),
             connect.directory(options.base)
           ];
         }
				}
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// Default task
	grunt.registerTask( 'default', [ 'serve' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect' ] );

};
